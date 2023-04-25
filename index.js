//setting up express server 
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

// setup the chat server to be used with socket.io
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000");

// setup the video chat server to be used with socket.io and peer.js
const videoChatServer = require("http").Server(app);
const videoChatSockets = require("./config/video_chat_sockets").videoChatSockets(videoChatServer);
videoChatServer.listen(3000);
console.log("video chat server is listening on port 3000");


const { v4: uuidV4 } = require('uuid');
const userS = [], userI = [];
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(videoChatServer, {
    debug: true
});
app.use('/peerjs', peerServer);

app.set("layout room", false);

//sass setup
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//tell our server to use the layout library before the routes
app.use(expressLayouts);
//tell where to look out for startic files
app.use(express.static('./assets'));
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db
//middleware to encrypt the cookie
app.use(session({
    name: 'ehealthcare',
    //TODO change the secret before deployment in production node
    secret: 'uwuwuwuwuwuwu',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1/e_healthcare_smit',
        autoRemove: 'disabled'
    }, function (err) { console.log(err || 'connect-mongodb setup ok'); })
}
));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use express router 
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`); //interpolation, using backticks
    }
    console.log(`Server is running on port: ${port}`);
});