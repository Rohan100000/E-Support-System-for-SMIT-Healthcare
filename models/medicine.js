const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dosage:{
        type:String,
        required: true
    },
    frequency:{
        type:Number,
        required: true
    },
    days:{
        type:Number,
        required: true
    },
    quantity:{
        type:String,
        required: true
    },
    instruction:{
        type:String,
        required: true
    }

}, {
    timestamps: true
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;