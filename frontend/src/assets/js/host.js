exports.host = {
  url: "http://localhost",
  port: "3000"
};

exports.socket_host = {
  url: "http://localhost",
  port: "3002"
};

exports.peer_host = {
  url: "http://localhost",
  port: "3003"
};

exports.getApi = () => {
  return this.host.url + ":" + this.host.port;
};

exports.getSockApi = () => {
  return this.socket_host.url + ":" + this.socket_host.port;
};
