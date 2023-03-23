const db = require('../config/mongoose');
const User = require('../models/user');


// render the sign up page
module.exports.signup = function (req, res) {
    return res.render('signup', {
        title: "Sign up"
    })
}

//get the sign up data
module.exports.create = async function (req, res) {
    try {
        // let user = await User.findOne({ email: req.body.email });
        // if (!user) {
        //     // let user = await User.create(req.body); 
        //         return res.redirect('/users/sign-in');
        // }
        // else {
        //     return res.redirect('back');
        // }
        
    } catch (err) {
        console.log('error in creating user in signing up');
        return;
    }

}