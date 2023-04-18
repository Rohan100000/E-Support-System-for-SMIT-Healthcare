const db = require('../config/mongoose');

// render the profile page
module.exports.profile = function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('doctor-profile', {
            title: "Doctor Profile"
        })
    }else{
        return res.redirect('/users/sign-in');
    }
}