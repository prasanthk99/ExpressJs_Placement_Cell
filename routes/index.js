const express = require('express');
const router = express.Router();
const passport = require('passport');

// console.log('routes loaded');
// const usersController = require('../controllers/users_controller')

// set Controller for the route
router.get('/',passport.checkAuthentication,require('../controllers/index').index);
// router.use('/profile',require('./profile'));
// router.post('/register',require('../controllers/signup.js').register);

// router.use('/login',require('./login'));
// router.use('/signup',require('./signup'));

// router.use('/signup',usersController.signup);
// router.use('/login',usersController.login);
// router.post('/register',usersController.register);
router.use('/users',require('./users'));

router.use('/admin',passport.checkAuthentication,require('./adminroute'));


module.exports = router;