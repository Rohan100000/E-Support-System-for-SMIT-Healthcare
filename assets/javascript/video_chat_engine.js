const socket = io.connect("http://localhost:3000");
const videoGrid = document.getElementById("video-grid"); 
const myPeer = new Peer(window.locals.chatting_key);
const myVideo = document.createElement('video');
myVideo.muted = true;

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(function(stream){
  addVideoStream(myVideo, stream);

  myPeer.on('call',function(call){
    call.answer(stream);
    const video = document.createElement('video');
    call.on('stream',function(userVideoStream){
      addVideoStream(video,userVideoStream);
    })
  });

  socket.on("user-joined", function (chatroom) {
    console.log("a user joined video chat: ", chatroom);
    connectToNewUser(chatroom,stream);
  });
})
socket.on('user-disconnected',function (chatroom){
  console.log(chatroom);
})
myPeer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
  socket.emit("join-room", window.locals.chatting_key);
});
// socket.on("connect",function () {
  // console.log("connection established using sockets...!");
  // socket.emit("join-room", {
  //   user_email: self.userEmail,
  //   chatroom: window.locals.chatting_key
  // });
  // console.log("chatkey:", window.locals.chatting_key);
  // socket.on("user-joined", function (data) {
  //   console.log("a user joined video chat: ", data);
  // });
// })

function connectToNewUser(chatroom,stream){
  const call = myPeer.call(chatroom,stream);
  const video = document.createElement('video');
  call.on('stream',function (userVideoStream){
    addVideoStream(video,userVideoStream);
  })
  call.on('close',function(){
    video.remove();
  })
}

function addVideoStream(video, stream){
  video.srcObject = stream;
  video.addEventListener("loadedmetadata",function(){
    video.play();
  });
  videoGrid.append(video);
}