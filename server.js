const express = require('express')
const app = express()
const connectDB = require('./config/db')
const path = require('path'); //heroku

const cors = require('cors')
app.use(cors())


//connect to database 
connectDB()

//Init Middlewares
app.use(express.json({ extended: false }))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/guests', require('./routes/guests'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

const PORT = process.env.PORT || 1010
app.listen(PORT, () => console.log(`server started at port ${PORT}`))