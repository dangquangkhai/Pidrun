var express = require('express');
var router = express.Router();
var _provider = require("../db/provider/UserProvider");
const jwt = require('jsonwebtoken');
const validateUser = require("../lib/auth");

//This api require email as parameter
router.post("/register", (req, res) => {
    var user = req.body.user;
    try {
        let check_email = _provider.findUsrByEmail(user.email);
        check_email.then(val => {
            console.log(val);
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
        }).catch(err => {
            return res.json({
                success: false,
                content: err
            });
        })
    } catch (error) {
        return res.json({
            success: false,
        });
    }
})

router.post("/login", (req, res) => {
    try {
        var user = req.body.user;
        var check = _provider.login(user.email, user.pass);
        check.then(val => {
            if (val.success) {
                const token = jwt.sign({
                    userId: val.content._id
                }, req.app.get('secretKey'), {
                    expiresIn: Math.floor(Date.now() / 1000) - 30
                });
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
        })
    } catch (error) {
        res.json({
            success: false,
            content: error
        });
    }

})

router.post("/IsLoged", validateUser, (req, res) => {
    return res.json({
        status: "success",
        message: "User Already Login",
        data: null
    });
})

router.post("/ActiveUser", (req, res) => {
    let key = req.body.key;
    _provider.requestActive(key).then(val => {
        return res.json(val)
    }).catch(err => {
        return res.json({
            success: false,
            content: err
        });
    })
})

router.post("/")

module.exports = router;