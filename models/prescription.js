const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    date:{
        type:Date
    },
    hospital_department:{
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
    test:[{
        type:String
    }],
    medicine:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dosage",
        required: true
    }],
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {
    timestamps: true
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;