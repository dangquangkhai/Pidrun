var express = require('express');
var router = express.Router();
var _provider = require("../db/provider/UserProvider");
const jwt = require('jsonwebtoken');

//This api require email as parameter
router.post("/register", (req, res) => {
    var user = req.body.user;
    console.log(user);
    try {
        _provider.createUser(user);
        return res.json({
            success: true
        });
    } catch (error) {
        return res.json({
            success: false,
        });
    }
})

router.post("/login", (req, res) => {
    try {
        var user = req.body.user;
        var check = _provider.login(user.email, user.password);
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

module.exports = router;