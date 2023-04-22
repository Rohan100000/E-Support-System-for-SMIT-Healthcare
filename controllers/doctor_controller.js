const db = require('../config/mongoose');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');
const Prescription = require('../models/prescription');
const Medicine = require('../models/medicine');



// render the profile page
module.exports.profile = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            let patient_list = await User.find({ is_doctor: false });
            let doctor = await User.findById(req.user._id);
            doctor = await Doctor.findOne({ email: doctor.email });
            let appointments = await Appointment.find({ doctor: doctor, patient: patient_list[0] }).sort("timing");
            let appointment_container = [];
            for (let appointment of appointments) {
                let time = appointment.timing.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
                for (let i = 0, j; i < time.length; i++) {
                    if (time[i] == ',') {
                        j = i + 2;
                        time = time.substring(j, time.length);
                        break;
                    }
                }
                let curr_patient = await User.findById(appointment.patient);
                appointment_container.push({
                    patient: curr_patient.username,
                    day: appointment.timing.toDateString(),
                    time: time
                });
            }
            console.log(appointment_container);
            return res.render('doctor-profile', {
                title: "Patient Profile",
                patient_list: patient_list,
                appointments: appointment_container,
                patient: patient_list[0]
            })
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log("error in loading the doctor's profile: ", error);
        return;
    }

}
// render the profile page specific to a patient.
module.exports.profile_patient = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            let patient_list = await User.find({ is_doctor: false });
            let doctor = await User.findById(req.user._id);
            doctor = await Doctor.findOne({ email: doctor.email });
            let patient = await User.findById(req.params.id);
            let appointments = await Appointment.find({ doctor: doctor, patient: patient }).sort("timing");
            let appointment_container = [];
            for (let appointment of appointments) {
                let time = appointment.timing.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
                for (let i = 0, j; i < time.length; i++) {
                    if (time[i] == ',') {
                        j = i + 2;
                        time = time.substring(j, time.length);
                        break;
                    }
                }
                let curr_patient = await User.findById(appointment.patient);
                appointment_container.push({
                    patient: curr_patient.username,
                    day: appointment.timing.toDateString(),
                    time: time
                });
            }
            console.log(appointment_container);
            return res.render('doctor-profile', {
                title: "Patient Profile",
                patient_list: patient_list,
                appointments: appointment_container,
                patient: patient
            })
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log("error in loading the doctor's profile: ", error);
        return;
    }
}



//prescription form submission

module.exports.createPrescription = async function (req, res) {
    try {
        //find legitmate doctor
        let doctor = await User.findById(req.user.id);
        //find legitmate patient
        let patient = await User.findById(req.params.id);
        //check if doctor patient exist
        if (doctor && patient) {
            //create medicine
            let medicine = await Medicine.create({
                name: req.body.med_name,
                dosage: req.body.med_dosage,
                frequency: req.body.med_frequency,
                days: req.body.med_days,
                quantity: req.body.med_quantity,
                instruction: req.body.med_instruction
            });
            //create prescription
            let prescription = await Prescription.create({
                hostpital_department: req.body.hostpital_department,
                category: req.body.category,
                complaint: req.body.complaint,
                test: req.body.test,
                medicine: [medicine],
                doctor: doctor,
                patient: patient
            })
            console.log(prescription);
            return res.redirect('back');
        }
        //create meds append them to pres
        return res.redirect('back');

    } catch (err) {
        console.log('Error in creating prescription');
        return res.redirect('back');
    }
};