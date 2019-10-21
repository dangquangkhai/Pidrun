const jwt = require("jsonwebtoken");

let default_key = "generateUrlEncode";

function encodeUrl(obj) {
    return jwt.sign({
            url: obj
        },
        default_key
    );
}

function decodeUrl(urlEncode) {
    let url = jwt.verify(urlEncode, default_key);
    return url.url;
}

function isEmpty(str) {
    if (str !== undefined && str !== null && str !== "") {
        return false;
    }
    return true
}

//console.log();
module.exports = { encodeUrl, decodeUrl, isEmpty };