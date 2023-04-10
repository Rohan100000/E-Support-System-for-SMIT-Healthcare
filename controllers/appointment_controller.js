const db = require('../config/mongoose');
const User = require('../models/user');
const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');

module.exports.book_appointment = function(req,res){
    return res.render('appointment', {
        title: "Appointment"
    })
}

module.exports.create_appointment = async function(req,res){
    try{
        let doc = await Doctor.findOne({username: req.body.doctor});
        // check if the doctor are both legit in the database
        if(!doc){
            console.log("Doctor does not exist in the database.");
            return res.redirect('back');
        }
        let timing = new Date(req.body.timing);
        let newAppointment = {
            doctor: doc._id,
            patient: req.user._id,
            timing: timing,
        }
        let appointment = await Appointment.findOne(newAppointment);
        // find the appointment, if found, return else continue.
        if(!appointment){
            let user = await User.findById(req.user._id).populate({path: "appointments"})
            // in the appointments array of the user find if there exists an appointment with the same timing
            for(let ap of user.appointments){
                if(ap.timing == newAppointment.timing){
                    console.log("The user already has an appointment booked at this particular slot");
                    return res.redirect("back");
                }
            }
            let appointment = await new Appointment(newAppointment);
            Appointment.create(appointment);
            user.appointments.push(appointment);
            user.save();
            doc.appointments.push(appointment);
            doc.save();
            return res.redirect("/");
        }
        
    }catch(error){
        console.log('error in booking an appointment');
        return;
    }
}