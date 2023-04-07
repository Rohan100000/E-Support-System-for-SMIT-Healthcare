const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
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
    qualification: {
        type: String
    },
    // include the array of ids of all appointments in this doctor schema itself
    appointments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
    }]
}, {
    timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;