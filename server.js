const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


//Connect to the Database
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to the Database');
});

//Check for Error with the Database
mongoose.connection.on('error', (error) => {
    console.log(error);
});

const app = express();

const port = process.env.PORT || 8080;

const users = require('./routes/users');

//Allows Communication with other domains
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware which grabs the data
app.use(bodyParser.json());

app.use('/users', users);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Route to the homepage
app.get('/', (req, res)=>{
    res.send('Invalid endpoint');
});

app.get('*', (req, res ) =>{
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.listen(port, ()=> {
    console.log('Server started on port '+port);
});