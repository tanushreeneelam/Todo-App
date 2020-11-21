require('dotenv').config()
// require('dotenv').config({ path: require('find-config')('.env') });
// var environment = require('dotenv').config();
// console.log(environment)
const mongoose = require('mongoose')
const url= process.env.MONGO_URL

const connectDB = async () => {
    try{
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
          })
        console.log("connected to mongoDB")

    }catch(err){
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB