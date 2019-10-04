const os = require("os");
const fs = require("fs");
email_server = {
  host: "smtp.gmail.com",
  port: 465,
  user: "pidrunhcm@gmail.com",
  pass: "Bravo@123"
};

web_host = {
  host: "localhost",
  port: 3050,
  protocal: "http"
};

//Windows path host
path_host = {
  root: "D:\\Pidrun",
  Con_Att: "D:\\Pidrun\\Conversation_Attachment",
  Img_Att: "D:\\Pidrun\\User_Image"
};

//MongoDB account
mongodb_url = {
  path: "mongodb://127.0.0.1/Pidrun"
};

//Unix, linux or freebsd host
unix_path_host = {
  root: "/home/" + os.userInfo().username + "/Pidrun",
  Con_Att:
    "/home/" + os.userInfo().username + "/Pidrun/Conversation_Attachment",
  Img_Att: "/home/" + os.userInfo().username + "/Pidrun/User_Image"
};

function getHost(prop_path) {
  switch (process.platform) {
    case "win32":
      return path_host[prop_path];
    case "freebsd":
    case "linux":
    case "darwin":
      return unix_path_host[prop_path];
  }
}

//Check all path before run server
function validAllHost() {
  let list_err = [];
  switch (process.platform) {
    case "win32":
      Object.keys(path_host).forEach(item => {
        if (!fs.existsSync(path_host[item])) {
          //console.log(path_host[item] + " not exist");
          list_err.push(new Object({ err: path_host[item] + " not exist" }));
        }
      });
      break;
    case "freebsd":
    case "linux":
    case "darwin":
      Object.keys(unix_path_host).forEach(item => {
        if (!fs.existsSync(unix_path_host[item])) {
          //console.log(unix_path_host[item] + " not exist");
          list_err.push(
            new Object({ err: unix_path_host[item] + " not exist" })
          );
        }
      });
      break;
  }
  return list_err;
}

module.exports = {
  email: email_server,
  web: web_host,
  server_path: path_host,
  getHost: getHost,
  validAllHost: validAllHost,
  mongodb_url: mongodb_url
};

// console.log(getHost("root"));
// console.log(validAllHost());
