const db = require('../config/mongoose');
const User = require('../models/user');
const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');
const Prescription = require('../models/prescription');

module.exports.book_appointment = async function (req, res) {
    //fetch doctors 
    let doctors = await Doctor.find({});
    return res.render('appointment', {
        title: "Appointment",
        doctor_list: doctors
    })
}

module.exports.create_appointment = async function (req, res) {
    try {
        let doc = await Doctor.findOne({ username: req.body.doctor });
        // check if the doctor are both legit in the database
        if (!doc) {
            console.log("Doctor does not exist in the database.");
            req.flash('error', 'Failed! Doctor does not exist.')
            return res.redirect('back');
        }

        let timing = new Date(req.body.timing).toISOString();
        timing = new Date(timing);
        console.log(typeof (timing));

        //check the number of appointments at given timing !(>=10)
        let appointments_at_time = await Appointment.find({timing: timing});
        if(appointments_at_time.length >= 10){
            req.flash('error', 'Failed! Time slot full. Please choose another time slot.')
            return res.redirect('back');
        }

        //create new appointment object
        let newAppointment = {
            doctor: doc._id,
            patient: req.user._id,
            timing: timing,
        }
        let appointment = await Appointment.findOne(newAppointment);

        // find the appointment, if found, return else continue.
        if (!appointment) {
            let user = await User.findById(req.user._id).populate('appointments')
            // in the appointments array of the user find if there exists an appointment with the same timing
            for (let ap of user.appointments) {
                let t1= ap.timing.toISOString(), t2 = newAppointment.timing.toISOString();
                if (t1==t2) {
                    console.log("The user already has an appointment booked at this particular slot");
                    req.flash('error','Failed! You already have an appointment booked at the chosen time slot.')
                    return res.redirect("back");
                }
            }
            let appointment = await new Appointment(newAppointment);
            Appointment.create(appointment);
            console.log(appointment);
            user.appointments.push(appointment);
            user.save();
            doc.appointments.push(appointment);
            doc.save();
            req.flash('success', 'Appointment booked Successfully!')
            return res.redirect("/");
        }
        req.flash('error','Failed! You already have an appointment booked at the chosen time slot.')
        return res.redirect('back');
    } catch (error) {
        console.log('error in booking an appointment');
        req.flash('error', 'Failed to book the appointment.')
        return;
    }
}

module.exports.list_appointments = async function (req, res) {
    try {
        let appointments = await Appointment.find({ patient: req.user._id, doctor: req.params.id }).sort("timing");
        let doctor = await Doctor.find({});
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
            let curr_doctor = await Doctor.findById(appointment.doctor);
            appointment_container.push({
                doctor: curr_doctor.username,
                day: appointment.timing.toDateString(),
                time: time
            });
        }
        console.log(appointment_container);
        //fetching prescription related to the patient specific doctor
        let prescription_list = await Prescription.find({ patient: req.user._id, doctor: req.params.id }).populate('medicine').populate('doctor').populate('patient').sort({ "createdAt": -1 });
        console.log(prescription_list);
        return res.render('patient-profile', {
            title: "Patient Profile",
            appointments: appointment_container,
            doctors: doctor,
            prescription_list:prescription_list
        })
    } catch (error) {
        console.log('error in listing appointments');
        return;
    }
}