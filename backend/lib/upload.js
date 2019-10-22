const multer = require("multer");
const config = require("./config");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const app = require("../app");
const path = require("path");

let usr_img = multer.diskStorage({
    destination: function(req, file, cb) {
        let UserId = jwt.decode(req.headers["x-access-token"], req.app.get("secretKey")).userId;
        console.log(UserId);
        if (!fs.existsSync(config.getHost("Img_Att") + config.getOsEx() + UserId)) {
            fs.mkdirSync(config.getHost("Img_Att") + config.getOsEx() + UserId);
        }
        fs.readdir(config.getHost("Img_Att") + config.getOsEx() + UserId, (err, files) => {
            if (err) {
                throw err;
            }
            for (const file of files) {
                fs.unlink(path.join(config.getHost("Img_Att") + config.getOsEx() + UserId, file), err => {
                    if (err) throw err;
                });
            }
        })
        cb(null, config.getHost("Img_Att") + config.getOsEx() + UserId);
    },
    filename: function(req, file, cb) {
        let UserId = jwt.decode(req.headers["x-access-token"], req.app.get("secretKey")).userId;
        console.log(UserId);
        cb(null, UserId + '-' + file.fieldname + '-' + Date.now() + "." + file.mimetype.split("/")[1]);
    }
})

let con_att = multer.diskStorage({
    destination: function(req, file, cb) {
        let conid = req.body.ConId;
        if (!fs.existsSync(config.getHost("Con_Att") + config.getOsEx() + conid)) {
            fs.mkdirSync(config.getHost("Con_Att") + config.getOsEx() + conid);
        }
        cb(null, config.getHost("Con_Att") + config.getOsEx() + conid);
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

module.exports = {
    usr_img: usr_img,
    con_att: con_att
}