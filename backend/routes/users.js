var express = require("express");
var router = express.Router();

var _provider = require("../db/provider/UserProvider");
var fs = require("fs");
var config = require("../lib/config");
const path = require("path");
const utils = require("../lib/utils");
const multer = require('multer');
const upload_config = require("../lib/upload");
const validateUser = require("../lib/auth");
const jwt = require("jsonwebtoken");

let upload_usr_img = multer({ storage: upload_config.usr_img });

/* GET users listing. */
router.get("/", function(req, res, next) {
    res.send("respond with a resource");
});

router.get("/movie", (req, res, next) => {
    res.json({
        success: true,
        content: "OK WORLd"
    });
});

router.post("/userinfo", (req, res, next) => {
    var userid = req.body.userId;
    _provider
        .findUsrById(userid)
        .then(val => {
            val.password = "";
            val.image =
                val.image !== "" && val.image !== null && val.image !== undefined ?
                utils.encodeUrl(config.getHost("Img_Att") + val.image) :
                utils.encodeUrl(
                    path.resolve(__dirname, "../public/images/") +
                    "/default-avatar.jpg"
                );
            return res.json({
                success: true,
                content: val
            });
        })
        .catch(err => {
            return res.json({
                type: Date,

                success: false,
                content: err
            });
        });
});

router.get("/getusrimage", (req, res, next) => {
    var userid = req.body.userId;
    _provider
        .findUsrById(userid)
        .then(val => {
            if (val !== null && val !== undefined) {
                if (val.image !== null && val.image !== undefined) {
                    console.log("User");
                    fs.readFile(config.server_path.Img_Att + val.image, (err, data) => {
                            return data;
                        })
                        .then(val => {
                            res.sendFile(val);
                        })
                        .catch(err => {
                            res.send("");
                        });
                } else {
                    res.sendFile(
                        path.resolve(__dirname, "../public/images/") + "/default-avatar.jpg"
                    );
                }
            } else {
                res.send("");
            }
        })
        .catch(err => {
            res.send("");
        });
});
router.get("/getusrcontact", (req, res, next) => {
    var userid = req.body.userId;
    var nextid = req.body.nextId;
    _provider.getContact(userid, nextid, 10, obj => {
        if (obj !== null && obj !== undefined) {
            res.json(obj);
        }
        res.json({ success: false, content: "Some thing wrong" });
    });
});

router.post("/uploadimage", upload_usr_img.single('image'), (req, res, next) => {
    let userid = jwt.decode(req.headers["x-access-token"], req.app.get("secretKey")).userId;
    let file_info = req.file;
    console.log(file_info);
    console.log(userid);
    let image = file_info.path.split(config.getHost("Img_Att"))[1];
    _provider.updateImage(userid, image).then(val => {
        return res.json(val)
    }).catch(err => { return res.json({ success: false, content: "Something wrong!!!" }) });
});

router.post("/updateinfo", (req, res, next) => {

    var userid = req.body.userId;
    var userinfo = req.body.userinfo;
    _provider.updateInfo(userid, userinfo).then(val => {
        return res.json(val);
    }).catch(err => {
        return res.json({ success: false, content: "Some thing wrong!!!" });
    })
})

router.post("/updatepass", (req, res, next) => {
    var userid = req.body.userId;
    var contentPassword = req.body.contentPassword;
    if (contentPassword.pass !== contentPassword.repass) {
        return res.json({ success: false, content: "Password is not match" })
    }
    _provider.updatePass(userid, contentPassword.oldpass, contentPassword.pass).then(val => {
        return res.json(val);
    }).catch(err => {
        return res.json({ success: false, content: "Some thing wrong!!!" });
    })
})


module.exports = router;