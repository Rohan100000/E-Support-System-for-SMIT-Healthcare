const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    // include the array of ids of all appointments in this user schema itself
    appointments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
    }],
    is_doctor:{
        type: Boolean
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;