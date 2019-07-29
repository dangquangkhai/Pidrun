exports.host = {
  url: "http://localhost",
  port: "3000"
}

exports.getApi = () => {
  return this.host.url + ":" + this.host.port;
}
