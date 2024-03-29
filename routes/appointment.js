const express = require('express');
const router = express.Router();
const passport = require('passport');
const appointmentController = require('../controllers/appointment_controller');

router.get('/book-appointment',appointmentController.book_appointment);
router.post('/create-appointment',passport.checkAuthentication,appointmentController.create_appointment);
router.get('/list-appointments/:id',passport.checkAuthentication,appointmentController.list_appointments);

module.exports = router;