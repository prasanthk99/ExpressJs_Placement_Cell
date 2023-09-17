const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8080;
const db = require('./config/mongoose');

const expressLayouts = require('express-ejs-layouts');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-config');

app.use(express.urlencoded({extended: false})); 
app.use(express.json());

app.use(cookieParser());


// Setting-up static files
app.use(express.static('./assets'));    

// setting layout
app.use(expressLayouts);

// set css and style of each pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name:"session",
    secret:"secretkey",
    saveUninitialized: false,
    resave:false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use Express Router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('Erro :',err);
    }
    console.log('Server is running on port : '+port);
})