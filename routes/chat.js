const express = require('express');
const router = express.Router();
const passport = require('passport');
const chatController = require('../controllers/chat_controller');

router.get('/chat-with-doctor', passport.checkAuthentication, chatController.chat_with_doctor);
router.get('/chat-with-patient', passport.checkAuthentication, chatController.chat_with_patient);
router.get('/chat-with-doctor-id/:id', passport.checkAuthentication, chatController.chat_with_doctor_id);
router.get('/chat-with-patient-id/:id', passport.checkAuthentication, chatController.chat_with_patient_id);

router.get('/video-chat-with-doctor', passport.checkAuthentication, chatController.video_chat_with_doctor);
router.get('/video-chat-with-patient', passport.checkAuthentication, chatController.video_chat_with_patient);
router.get('/video-chat-with-doctor-id/:id', passport.checkAuthentication, chatController.video_chat_with_doctor_id);
router.get('/video-chat-with-patient-id/:id', passport.checkAuthentication, chatController.video_chat_with_patient_id);

module.exports = router;