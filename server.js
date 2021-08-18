const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport')
// MongoDB Driver
const mongoose = require('mongoose')

const port = 3000;

const DB_URI = "mongodb+srv://Saed:1234@test-cluster.51nrg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// Connect to MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// CONNECTION EVENTS
mongoose.connection.once('connected', function () {
    console.log("Database connected to Mongo cloud")

})
mongoose.connection.on('error', function (err) {
    console.log("MongoDB connection error: " + err)
})
mongoose.connection.once('disconnected', function () {
    console.log("Database disconnected")
})

// If Node's process ends, close the MongoDB connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log("Database disconnected through app termination")
        process.exit(0);
    })
})

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares => before and after request
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// Serve Static Files from /public
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name: 'sessionId',
    secret: "mysecretkeythatiwillnottellyou",
    saveUninitialized: false, // don't create sessions for not logged in users
    resave: false, //don't save session if unmodified

    // Where to store session data
    store: MongoStore.create({
        mongoUrl: DB_URI
    }),

    // cookies settings
    cookie: {
        secure: false,
        httpOnly: false, // if true, will disallow JavaScript from reading cookie data
        expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour;
    }
}))
// Passport Config
require('./config/passport')(passport); // pass passport for configuration
// Passport init (must be after establishing the session above)
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Pass 'req.user' as 'user' to ejs templates
// Just a custom middleware
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    // res.locals is an object available to ejs templates. for example: <%= user %>
    next();
})


// Routes ----------------------------------------------
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/pages'));
app.use('/manager', require('./routes/manager'));
app.use('/member', require('./routes/member'));
// -----------------------------------------------------



// Data for testing
const VaccineType = require('./models/VaccineType');
VaccineType.findOne({name: 'Pfizer-BioNTech'}, function (err, obj) { 
    if(err) console.log(err);
    if(obj === null) {
        new VaccineType({
            name: 'Pfizer-BioNTech',
            minAge: 12,
            numberOfDoes: 2
        }).save();
    }
});

VaccineType.findOne({name: 'Moderna'}, function (err, obj) { 
    if(err) console.log(err);
    if(obj === null) {
        new VaccineType({
            name: 'Moderna',
            minAge: 18,
            numberOfDoes: 2
        }).save();
    }
});

VaccineType.findOne({name: 'Johnson & Johnson’s Janssen'}, function (err, obj) { 
    if(err) console.log(err);
    if(obj === null) {
        new VaccineType({
            name: 'Johnson & Johnson’s Janssen',
            minAge: 18,
            numberOfDoes: 1
        }).save();
    }
});


app.listen(port, function () {
    console.log(`listening on port ${port}...`)
})
