const express = require('express');
var app = express();
const router = express.Router();
const {check,validationResult} = require('express-validator'); 
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

// const cors = require('cors')
// app.use(cors())

// router.post('/', (req,res) => {
//     res.send("user registered!")
// })

//user Model 
const User = require('../models/User')

router.post('/', 
[
    check('name', 'Please provide a Name').not().isEmpty(),
    check('email', 'Please provide a valid Email ID').isEmail(),
    check('password', 'Please enter a password with at least 6 characters').isLength({ min: 6 })
],
async (req,res) => {
    // console.log("----------");
    // console.log("backendddd");
    const errors= validationResult(req);
    // console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json( {error: errors.array()} )
    }
    // res.send("succesfully!")
    
    const {name,email,password} = req.body
    try{

        let user = await User.findOne({email})
        if(user){
            // console.log('user already exists')
            return res.status(400).json({msg:'User already exists!'})
            // return res.status(400).json({"id":user.id, "_id":user._id})
        }

        user = new User({name,email,password});
        // password encryption
        const salt= await bcrypt.genSalt(10);
        user.password= await bcrypt.hash(password,salt);
        await user.save();

        // sign a jsonwebtoken
        const payload = {
            user: {
            id: user.id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 36000
          },
          (err, token) => {
              if (err) throw err
              res.json({ token })
           }
        )

        // console.log("jwttt")

    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router 