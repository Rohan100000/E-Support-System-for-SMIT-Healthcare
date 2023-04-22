const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    date:{
        type:Date
    },
    hostpital_department:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    complaint:{
        type:String,
        required:true
    },
    test:{
        type:String,
        required:true
    },
    medicine:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true
    }],
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    }

}, {
    timestamps: true
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;