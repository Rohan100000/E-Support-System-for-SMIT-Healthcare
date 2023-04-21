const express = require('express');
const router = express.Router();
const passport = require('passport');
const doctorController = require('../controllers/doctor_controller');

router.get('/profile',passport.checkAuthentication,doctorController.profile);
router.get('/profile_patient/:id',passport.checkAuthentication,doctorController.profile_patient);

module.exports = router;