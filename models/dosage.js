const mongoose = require('mongoose');

const dosageSchema = new mongoose.Schema({
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

const Dosage = mongoose.model('Dosage', dosageSchema);

module.exports = Dosage;