const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log('router loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/appointment',require('./appointment'));
router.use('/doctor',require('./doctor'));
router.use('/chat',require('./chat'));
router.get('/:room', (req, res) =>{
	let addRoomId = req.params.room;
    console.log(addRoomId);
	res.render('room',{roomId: `${addRoomId}`, layout: 'room' }); //get id from address bar and send to ejs
})

module.exports = router;