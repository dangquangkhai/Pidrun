const jwt = require("jsonwebtoken");

let default_key = "generateUrlEncode";

function encodeUrl(obj) {
  return jwt.sign(
    {
      url: obj
    },
    default_key
  );
}

function decodeUrl(urlEncode) {
  let url = jwt.verify(urlEncode, default_key);
  return url.url;
}

//console.log();
module.exports = { encodeUrl, decodeUrl };
