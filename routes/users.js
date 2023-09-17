const express = require('express');
const router = express.Router();
const passport = require('passport');

// console.log('routes loaded');
const usersController = require('../controllers/users_controller')

// set Controller for the route
// router.get('/',require('../controllers/index').index);

// router.use('/profile',require('./profile'));
// router.post('/register',require('../controllers/signup.js').register);

// router.use('/login',require('./login'));
// router.use('/signup',require('./signup'));

router.get('/signup',passport.checkNotAuthenticated,usersController.signup);
router.get('/login',passport.checkNotAuthenticated,usersController.login);


router.post('/register',usersController.register);

// use passport as a middleware to authenticate
router.post('/createSession',passport.authenticate('local', { failureRedirect: '/users/login', failureMessage: true }),
function(req, res) {
  res.redirect('/admin');
});

router.post('/logout', function(req, res, next){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/users/login');
    });
});

module.exports = router;