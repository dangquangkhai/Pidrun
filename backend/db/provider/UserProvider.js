// const mongo = require('mongodb').MongoClient;
// const client = require('socket.io').listen(4000).sockets;
// var db = mongo.connect('mongodb://127.0.0.1/Pidrun');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://127.0.0.1/Pidrun', {
    useNewUrlParser: true
});
var db = mongoose.connection;
const Users = require("../model/Users");
const ActiveUser = require("../model/ActiveUser");
var fs = require('fs');
var config = require("../../lib/config");
var nodemailer = require('nodemailer');
var generate = require('./genStr');
var sha256 = require('js-sha256').sha256;
var sendMail = require('./mail');

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

class UserProvider {
    UserProvider() {}

    async registerUser(user) {
        user.created = new Date();
        user.updated = new Date();
        user.isactive = false;
        user.isblock = false;
        user.password = sha256(user.password);
        let _user = await Users.create(user).then(val => {
            return {
                success: true,
                content: val
            };
        }).catch(err => {
            return {
                success: false,
                content: err
            };
        });
        if (_user.success) {
            var active = new ActiveUser();
            active.email = _user.content.email;
            active.key = generate(50);
            active.UserId = _user.content._id;
            active.created = new Date();
            active.updated = new Date();
            let createKey = await ActiveUser.create(active).then(val => {
                return {
                    success: true
                };
            }).catch(err => {
                return {
                    success: false,
                    content: err
                };
            })
            if (createKey.success) {
                let url = config.web.protocal + "://" + config.web.host + (config.web.port !== null && config.web.port !== undefined) ? (":" + config.web.port) : ("") + "activeuser?key=" + active.key;
                let template_html = fs.readFileSync("../../public/template/active-user/content.html", 'utf8');
                template_html = template_html.replaceAll("{{name}}", _user.content.firstname + " " + _user.content.lastname);
                template_html = template_html.replaceAll("{{action_url}}", url);
                return await sendMail(active.email, "Kích hoạt tài khoản | Pidrun Team", "Kích hoạt tài khoản", template_html).then(() => {
                    return true
                }).catch(err => {
                    return false
                });
            }
        } else {
            return await _user;
        }

    }

    async activeUser(key) {
        let find = await ActiveUser.findOne({
            "key": key
        }, (err, res) => {
            return res
        }).then(val => {
            return {
                success: true,
                content: val
            }
        }).catch(err => {
            return {
                success: false,
                content: true
            }
        });
        if (find.content.success) {
            return await Users.findByIdAndUpdate(find.content.content.UserId, {
                "isactive": true
            }, (err, res) => {}).then(() => {
                return true
            }).catch(err => {
                return false
            });
        } else {
            return await find;
        }
    }

    getAllUser() {
        Users.find({}, (err, res) => {
            console.log(res);
        });
    }

    async findUsrByEmail(email) {
        return await Users.findOne({
            "email": email
        }, (err, res) => {
            res.password = null;
            console.log(res);
            return res;
        });
    }
    async findUsrById(id) {
        return await Users.findById(id, (err, res) => {
            console.log(err);
            return res;
        })
    }

    async login(email, pass) {
        let find = await Users.findOne({
            "email": email
        }, (err, res) => {
            return res;
        }).then(val => {
            return {
                success: true,
                content: val
            }
        }).catch(err => {
            return {
                success: false,
                content: err
            }
        })

        if (find == null || find == undefined) {
            return await new Object({
                success: false,
                content: "User not exist"
            });
        }
        if (find.content.password == sha256(pass)) {
            if (find.content.isactive && !find.content.isblock) {
                find.content.password = "";
                return await new Object({
                    success: true,
                    content: find.content
                });
            }
            if (!find.content.isactive) {
                return await new Object({
                    success: false,
                    content: "UserIsNotActived"
                });
            }
            if (find.content.isblock) {
                return await new Object({
                    success: false,
                    content: "User is blocked"
                });
            }
        } else {
            return await new Object({
                success: false,
                content: "Uset not match"
            });
        }
    }

    async requestActive(email) {
        let key = generate(50);
        let find = await ActiveUser.findOneAndUpdate({
            "email": email
        }, {
            "key": key,
            "updated": new Date()
        }, (err, res) => {
            return res;
        }).then(val => {
            return {
                success: true,
                content: val
            }
        }).catch(err => {
            return {
                success: false,
                content: err
            }
        });
        if(find.success)
        {
            let url = config.web.protocal + "://" + config.web.host + ((config.web.port !== null && config.web.port !== undefined) ? (":" + config.web.port) : ("") )+ "/activeuser?key=" + key;
            console.log(url);
            let _user = await Users.findOne({"email": email}).then(val => {return val});
            console.log(_user);
            var receiver = (_user.firstname !== null || _user.lastname !== null)?(_user.firstname + " " + _user.lastname):(_user.email);
            let template_html = fs.readFileSync("../../public/template/active-user/content.html", 'utf8');
            template_html = template_html.replaceAll("{{name}}", receiver);
            template_html = template_html.replaceAll("{{action_url}}", url);
            return await sendMail(email, "Kích hoạt tài khoản | Pidrun Team", "Kích hoạt tài khoản", template_html).then(() => {
                return true
            }).catch(err => {
                return false
            });
        }
        else
        {
            return await find;
        }
    }
}

module.exports = new UserProvider();

try {
    // var user = new Users();
    // user.email = "davidarchuleta789@gmail.com";
    // user.password = "abc@123";
    // user.firstname = "Khải";
    // user.lastname = "Đặng";
    // user.birthday = new Date(1998, 12, 25);
    var _provider = new UserProvider();
    // let exc = _provider.registerUser(user);
    // exc.then(val => {
    //     console.log(val)
    // }).catch(err => console.log(err));
    // var x = _provider.login("davidarchuleta789@gmail.com", "abc@123");
    var x = _provider.requestActive("davidarchuleta789@gmail.com");
    x.then(val => {
        console.log(val)
    });

    // console.log(new UserProvider().getAllUser());
} catch (error) {
    console.log(error);
}