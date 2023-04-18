const express = require('express');
const router = express.Router();
const passport = require('passport');
const doctorController = require('../controllers/doctor_controller');

router.get('/profile',passport.checkAuthentication,doctorController.profile);

module.exports = router;