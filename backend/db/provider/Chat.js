const socketio = require("socket.io");
const mongoose = require("mongoose");
const events = require("events");
const _ = require("lodash");
const eventEmitter = new events.EventEmitter();
var _provider = require("./ConversationProvider");

//reatime magic begins here
module.exports.sockets = function(http) {
  io = socketio.listen(http);
  let users = [];

  let sendData = client => {
    io.to(client).emit("receiveMess", "for your eyes only");
  };

  io.on("connection", function(socket) {
    console.log("a user connected");
    socket.on("sendUsrInfo", function(data) {
      console.log("a user " + data._id + " connected");
      //saving userId to array with socket ID
      let newInfo = new Object({
        id: new Object(socket.id),
        data: new Object(data._id)
      });
      let find = undefined;
      for (let i = 0; i < users.length; i++) {
        if (users[i] !== undefined && users[i] !== null) {
          if (users[i].data !== data._id && users[i].id == socket.id) {
            find = i;
            break;
          }
        }
      }
      if (find !== null && find !== undefined) {
        users.splice(find, 1, newInfo);
      } else {
        users.push(newInfo);
      }
      socket.broadcast.emit("checkonline", { online: true, id: data._id });
      socket.broadcast.emit("rechecklist", { recheck: true });
    });
    socket.on("disconnect", function() {
      let find = undefined;
      if (users.length > 0) {
        console.log(socket.id);
        for (let i = 0; i < users.length; i++) {
          if (users[i] !== undefined && users[i] !== null) {
            if (users[i].id == socket.id) {
              find = i;
              break;
            }
          }
        }
      }
      console.log(find);
      if (find !== undefined && find > -1) {
        console.log("user " + users[find].data + " disconnected");
        socket.broadcast.emit("checkonline", {
          online: false,
          id: users[find].data
        });
        socket.broadcast.emit("recheck", {
          recheck: true
        });
        users.splice(find, 1);
      }
      socket.broadcast.emit("rechecklist", { recheck: true });
    });
    socket.on("isonline", function(id) {
      let find = undefined;
      if (users.length > 0) {
        find = users.find(item => {
          return item.data == id;
        });
      }
      if (find !== undefined) {
        console.log(true);
        socket.emit("checkonline", {
          online: true,
          id: id
        });
      } else {
        console.log(false);
        socket.emit("checkonline", {
          online: false,
          id: id
        });
      }
    });
    socket.on("checklist", listId => {
      let list = [];
      let listOutput = [];
      list = listId !== undefined && listId !== null ? listId : list;
      for (let i = 0; i < list.length; i++) {
        users.forEach((item, index) => {
          if (item.data == list[i] && !listOutput.includes(list[i])) {
            listOutput.push(list[i]);
          }
        });
      }
      console.log(listOutput);
      socket.emit("checklist", listOutput);
    });
    socket.on("sendmessage", message => {
      let _socket = socket;
      if (message !== undefined && message !== null) {
        _provider
          .SendMessage(message._id, message.sender, message.mess)
          .then(val => {
            if (val.success) {
              let lstSocket = [];
              let par = [];
              par = message.par;
              _provider.getSender(message.sender).then(sender => {
                if (sender !== null && sender !== undefined) {
                  for (let i = 0; i < users.length; i++) {
                    par.forEach(item => {
                      if (
                        JSON.stringify(users[i].data) ==
                        JSON.stringify(item._id)
                      ) {
                        lstSocket.push(users[i].id);
                      }
                    });
                  }
                  _socket.emit(
                    "sendMess",
                    new Object({
                      mess: val.content,
                      sender: sender
                    })
                  );
                  if (lstSocket !== undefined && lstSocket !== null) {
                    lstSocket.forEach((item, index) => {
                      _socket.to(item).emit(
                        "receiveMess",
                        new Object({
                          mess: val.content,
                          sender: sender
                        })
                      );
                    });
                  }
                }
              });
            }
          });
      }
    });
  });
  return io;
};
