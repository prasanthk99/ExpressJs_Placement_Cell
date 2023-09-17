const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/',passport.checkAuthentication,require('../controllers/admin').admin);

router.get('/students',passport.checkAuthentication,require('../controllers/admin').students);
router.get('/placementCell',passport.checkAuthentication,require('../controllers/admin').placementCell);

router.get('/placementCell/:id/edit',passport.checkAuthentication,require('../controllers/admin').editPlacement);
router.post('/placementCell/:id/update',passport.checkAuthentication,require('../controllers/admin').updatePlacement);

router.post('/addInterview',passport.checkAuthentication,require('../controllers/admin').addInterview);

router.get('/delete/:id',passport.checkAuthentication,require('../controllers/admin').deleteList);


router.post('/addStudent',passport.checkAuthentication,require('../controllers/admin').addStudent);

router.get('/downloadStudentCSV',passport.checkAuthentication,require('../controllers/admin').downloadStudentsCSV);

module.exports = router;