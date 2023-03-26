const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "339488896157-pih8ktqjovndn4ildpm4qus9lgs6f4ip.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
},async function(accessToken, refreshToken,profile,done){
    let user = await User.findOne({email: profile.emails[0].value}).exec();
    if(!user){
        console.log("error in google strategy passport");
        return;
    }
    console.log(accessToken,refreshToken);
    console.log(profile);
    if(user){
        // if found, set this user as req.user
        return done(null,user);
    }else{
        // if not found, create the user and set it as req.user
        User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
        }, function(error,user){
            if(error){
                console.log("error in creating user google strategy passport: ",error);
                return;
            }
            return done(null,user);
        })
    }
}));

module.exports = passport;