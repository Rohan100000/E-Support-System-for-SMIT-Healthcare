const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const Doctor = require("../models/doctor");

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "339488896157-pih8ktqjovndn4ildpm4qus9lgs6f4ip.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
},function(accessToken, refreshToken,profile,done){
    User.findOne({email: profile.emails[0].value}).exec(function(error,user){
        if(error){
            console.log("error in google strategy passport: ",error);
            return;
        }
        console.log(accessToken,refreshToken);
        console.log(profile);
        if(user){
            // if found, set this user as req.user
            return done(null,user);
        }else{
            // if not found, create the user and set it as req.user
            Doctor.findOne({email: profile.emails[0].value}).exec(function(error,doctor){
                if(error){
                    console.log("error in google strategy passport: ",error);
                    return;
                }
                let is_a_doctor = false;
                if(doctor){
                    is_a_doctor = true;
                }
                User.create({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString("hex"),
                    is_doctor: is_a_doctor
                }, function(error,user){
                    if(error){
                        console.log("error in creating user google strategy passport: ",error);
                        return;
                    }
                    return done(null,user);
                })
            });
        }
    })
}));

module.exports = passport;