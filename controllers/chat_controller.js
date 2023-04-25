const db = require('../config/mongoose');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Chat = require('../models/chat');

module.exports.chat_with_doctor = async function (req, res) {
    // check if the user is authenticated and not a doctor.
    try {
        if (req.isAuthenticated()) {
            let doctors = await Doctor.find({});
            return res.render('patient-chat', {
                title: "Patient Chat",
                doctors: doctors,
            })
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log("error in loading user's chatting page: ", error);
        return;
    }
}
module.exports.chat_with_doctor_id = async function (req, res) {
    // check if the user is authenticated and not a doctor.
    try {
        if (req.isAuthenticated()) {
            let doctors = await Doctor.find({});
            let doctor = await Doctor.findById(req.params.id);
            let chat = await Chat.findOne({ doctor: doctor._id, patient: req.user._id });
            console.log("Patient:", chat);
            if (!chat) {
                chat = await Chat.create({
                    doctor: doctor._id,
                    patient: req.user._id
                });
            }
            console.log("Patient:", chat);
            return res.render('patient-chat', {
                title: "Patient Chat",
                doctors: doctors,
                chatting_key: chat.id
            })
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log("error in loading user's chatting page: ", error);
        return;
    }
}

module.exports.chat_with_patient = async function (req, res) {
    // check if the user is authenticated and not a doctor.
    try {
        if (req.isAuthenticated()) {
            let patient_list = await User.find({ is_doctor: false });

            return res.render('doctor-chat', {
                title: "Doctor Chat",
                patient_list: patient_list,
            })
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log("error in loading doctor's chatting page: ", error);
        return;
    }
}
module.exports.chat_with_patient_id = async function (req, res) {
    // check if the user is authenticated and not a doctor.
    try {
        if (req.isAuthenticated()) {
            let patient_list = await User.find({ is_doctor: false });
            let patient = await User.findById(req.params.id);
            let doctor = await User.findById(req.user._id);
            doctor = await Doctor.findOne({email: doctor.email});

            let chat = await Chat.findOne({ doctor: doctor._id, patient: patient });
            console.log("Patient:", chat);
            if (!chat) {
                chat = await Chat.create({
                    doctor: doctor._id,
                    patient: patient
                });
            }
            console.log("Doctor:", chat);
            return res.render('doctor-chat', {
                title: "Doctor Chat",
                patient_list: patient_list,
                chatting_key: chat.id
            })
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log("error in loading doctor's chatting page: ", error);
        return;
    }
}