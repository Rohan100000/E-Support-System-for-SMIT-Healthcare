const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctor: {
        // type: String,
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    patient: {
        // type: String,
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    timing: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;