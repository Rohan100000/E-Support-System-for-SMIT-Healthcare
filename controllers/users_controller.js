const db = require("../config/mongoose");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");

// render the sign up page
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("signup", {
    title: "Sign up",
  });
};
//render the sign in page
module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("signin", {
    title: "Sign in",
  });
};
// render the user profile page
module.exports.profile = async function(req,res){
  try{
    if (req.isAuthenticated()) {
      let doctor = await Doctor.find({});
      let appointments = await Appointment.find({patient: req.user._id, doctor: doctor[0]}).sort("timing");
      let appointment_container = [];
      for(let appointment of appointments){
          let time = appointment.timing.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
          for(let i = 0, j ; i < time.length; i++){
              if(time[i] == ','){
                  j = i+2;
                  time = time.substring(j,time.length);
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
      return res.render('patient-profile', {
          title: "Patient Profile",
          doctors: doctor,
          appointments: appointment_container
      })
    }else{
        return res.redirect('/users/sign-in');
    }
  }catch(error){
    console.log("error in loading user's profile page: ",error);
    return;
  }
}
//get the sign up data
module.exports.create = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      let doctor = await Doctor.findOne({ email: req.body.email });
      if (doctor) {
        req.body.is_doctor = true;
      } else {
        req.body.is_doctor = false;
      }
      let user = await User.create(req.body);
      return res.redirect("/users/sign-in");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("error in creating user in signing up: ",err);
    return;
  }
};

//sign in and create session for the user
module.exports.createSession = async function (req, res) {
  try{
    let user = await User.findOne({ email: req.body.email, is_doctor: true });
    if (user || req.user.is_doctor) {
      return res.redirect("/doctor/profile");
    }
    return res.redirect("/");
  }catch(error){
    console.log("error in creating a new session: ",error);
    return;
  }
};

module.exports.destroySession = function (req, res) {
  // logout has been upgraded as an asynchronous function so it requires a callback function to handle error now
  req.logout(function (error) {
    if (error) {
      return next(error);
    }
    return res.redirect("/");
  });
};