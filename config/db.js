// require('dotenv').config()
require('dotenv').config({ path: require('find-config')('.env') });
const mongoose = require('mongoose')
// const url= process.env.URL
const url= "mongodb+srv://Tanushree:ILoveRaffa28@rsvp.fh3wk.mongodb.net/todo-db?retryWrites=true&w=majority"

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