const passport = require('passport');
const Users = require('../models/user_model');

const LocalStrategy = require('passport-local').Strategy;

// function initialize(Users){

passport.use(new LocalStrategy({usernameField:'email'},
    function(email, password, done) {
        console.log("attempted login with %s:%s", email, password);
        // console.log("Users "+Users);
        Users.findOne({ email: email }).then( function (user, err) {
            if (err) { console.log('Error in finding user --> Passport'); return done(err); }
            if (!user || user.password != password) { console.log('Invalid Username/Password'); return done(null, false); }
            // if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        }).catch(e=>{
            console.log("Error "+e);
        });

        // const fndUser = Users.find(user => email==user.email);
        // try{
        //     if (fndUser==null) { return done(null, false); }
        //     if (!fndUser.password!=password) { return done(null, false) }; 
        //     return done(null,fndUser);
        // }catch(e){
        //     console.log(e);
        // }
    }
));

passport.serializeUser((user,done)=>{ console.log("serializing user uwu:" + JSON.stringify(user)); done(null,user.id) });
passport.deserializeUser((id,done)=>{ 
    console.log("deserializing user owo:" + JSON.stringify(id));
    Users.findById(id).then(function(user, err){
        console.log('deserialized');
        if(err){
            return done(err);
        }
        return done(null,user);
    }).catch(e=>{
        console.log("Error "+e);
    });
    // return done(null,Users.find(user=>user.id==id));
});

// }

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/login');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

passport.checkNotAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/admin')
    }
    next()
  }

module.exports = passport;
