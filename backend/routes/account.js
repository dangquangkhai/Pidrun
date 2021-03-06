var express = require("express");
var router = express.Router();
var _provider = require("../db/provider/UserProvider");
const jwt = require("jsonwebtoken");
const validateUser = require("../lib/auth");

//This api require email as parameter
router.post("/register", (req, res) => {
    var user = req.body.user;
    try {
        let check_email = _provider.findUsrByEmail(user.email);
        check_email
            .then(val => {
                if (val !== null && val !== undefined) {
                    val.password = "";
                }
                if (val !== undefined && val !== null) {
                    return res.json({
                        success: false,
                        content: "Email've already taken"
                    });
                }
                _provider.registerUser(user);
                return res.json({
                    success: true,
                    content: "Create user success"
                });
            })
            .catch(err => {
                return res.json({
                    success: false,
                    content: err
                });
            });
    } catch (error) {
        return res.json({
            success: false
        });
    }
});

router.post("/login", (req, res) => {
    try {
        let user = req.body.user;
        console.log(user);
        let check = _provider.login(user.email, user.pass);
        check.then(val => {
            if (val.success) {
                const token = jwt.sign({
                        userId: val.content._id
                    },
                    req.app.get("secretKey"), {
                        expiresIn: Math.floor(Date.now() / 1000) - 30
                    }
                );
                res.json({
                    success: true,
                    content: {
                        message: "user found!!!",
                        data: {
                            user: val.content,
                            token: token
                        }
                    }
                });
            } else {
                res.json({
                    success: false,
                    content: val.content
                });
            }
        });
    } catch (error) {
        res.json({
            success: false,
            content: error
        });
    }
});

router.post("/IsLoged", validateUser.validateUser, (req, res) => {
    return res.json({
        status: "success",
        message: "User Already Login",
        data: null
    });
});

router.post("/ActiveUser", (req, res) => {
    let key = req.body.key;
    _provider
        .activeUser(key)
        .then(val => {
            return res.json(val);
        })
        .catch(err => {
            console.log(err);
            return res.json({
                success: false,
                content: "Something wrong happen!!"
            });
        });
});

router.post("/RequestActive", (req, res) => {
    let email = req.body.email;
    _provider
        .requestActive(email)
        .then(val => {
            return res.json(val);
        })
        .catch(err => {
            return res.json({
                success: false,
                content: err
            });
        });
});

router.post("/requestforget", (req, res) => {
    let email = req.body.email;
    let info = req.body.info;
    _provider
        .requestForget(email, info)
        .then(val => {
            return res.json(val);
        })
        .catch(err => {
            console.log(err);
            return res.json({
                success: false,
                content: "Something wrong happen!!"
            });
        });
});

router.post("/forgetcheck", (req, res) => {
    let key = req.body.key;
    _provider
        .checkKeyForget(key)
        .then(val => {
            return res.json(val);
        })
        .catch(err => {
            return res.json({
                success: false,
                content: "Something wrong happen!!!"
            });
        });
});

router.post("/activecheck", (req, res) => {
    let key = req.body.key;
    _provider
        .checkKeyActive(key)
        .then(val => {
            return res.json(val);
        })
        .catch(err => {
            return res.json({
                success: false,
                content: "Something wrong happen!!!"
            });
        });
});

router.post("/forgetpass", (req, res) => {
    let key = req.body.key;
    let newpass = req.body.newpass;
    if (
        key === undefined ||
        key === null ||
        newpass === undefined ||
        newpass === null
    ) {
        return res.json({
            success: false,
            content: "key or pass is null"
        });
    }
    _provider
        .forgetPass(key, newpass)
        .then(val => {
            return res.json(val);
        })
        .catch(err => {
            return res.json({
                success: false,
                content: "Something wrong happen!!!"
            });
        });
});

module.exports = router;