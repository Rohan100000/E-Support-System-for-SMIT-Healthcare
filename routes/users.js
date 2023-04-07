const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');

router.get('/sign-up', usersController.signup);
router.post('/create', usersController.create);
router.get('/sign-in', usersController.signin);
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.createSession);
router.get("/sign-out", usersController.destroySession);
router.get('/auth/google',passport.authenticate("google",{scope: ["profile","email"]}));
router.get('/auth/google/callback',passport.authenticate("google",{failureRedirect: "/users/sign-in"}),usersController.createSession);

module.exports = router;