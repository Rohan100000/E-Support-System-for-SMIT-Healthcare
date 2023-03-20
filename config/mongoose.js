const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/e_healthcare_smit');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'ERROR: connecting to db'));
db.once('open', function(){
    console.log('Successfully connected to db');
});
module.exports = db;