const ExpressPeerServer = require("peer").ExpressPeerServer;

module.exports.peerserver = function(http) {
  const options = {
    debug: true
  };

  const peerserver = ExpressPeerServer(http, options);
  peerserver.on("connection", client => {
    console.log("Client connect");
    peerserver.on("disconnect", client => {
      console.log("Client disconnect");
    });
  });
  return peerserver;
};
