module.exports.videoChatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "*",
    },
  });
  const { v4: uuidV4 } = require('uuid');
  const userS = [], userI = [];
  io.on('connection', socket => {
    //code to disconnect user using socket simple method ('join-room')
    socket.on('join-room', (roomId, userId) => {

      userS.push(socket.id);
      userI.push(userId);
      //console.log("room Id:- " + roomId,"userId:- "+ userId);    //userId mean new user 

      //join Room
      console.log("room Id:- " + roomId, "userId:- " + userId);    //userId mean new user 
      socket.join(roomId);                                       //join this new user to room
      socket.broadcast.to(roomId).emit('user-connected', userId); //for that we use this and emit to cliet	

      //Remove User
      socket.on('removeUser', (sUser, rUser) => {
        var i = userS.indexOf(rUser);
        if (sUser == userI[0]) {
          console.log("SuperUser Removed" + rUser);
          socket.broadcast.to(roomId).emit('remove-User', rUser);
        }
      });

      //grid
      socket.on('obect', (sUser, object) => {
        if (sUser == userI[0]) {
          socket.broadcast.to(roomId).emit('grid_obj', object);
        }
      });

      //code to massage in roomId
      socket.on('message', (message, yourName) => {
        io.to(roomId).emit('createMessage', message, yourName);

      })

      socket.on('disconnect', () => {
        //userS.filter(item => item !== userId);
        var i = userS.indexOf(socket.id);
        userS.splice(i, 1);
        socket.broadcast.to(roomId).emit('user-disconnected', userI[i], userI);
        //update array

        userI.splice(i, 1);
      });
      socket.on('seruI', () => {
        socket.emit('all_users_inRoom', userI);
        //console.log(userS);
        console.log(userI);
      });
    })

  })
};
