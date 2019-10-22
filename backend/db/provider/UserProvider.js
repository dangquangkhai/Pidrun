// const mongo = require('mongodb').MongoClient;
// const client = require('socket.io').listen(4000).sockets;
// var db = mongo.connect('mongodb://127.0.0.1/Pidrun');
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://127.0.0.1/Pidrun", {
    useNewUrlParser: true
});
var db = mongoose.connection;
const Users = require("../model/Users");
const ActiveUser = require("../model/ActiveUser");
const UserContact = require("../model/UserContact");
const ForgetPassword = require("../model/ForgetPassword");
var fs = require("fs");
var config = require("../../lib/config");
var utils = require("../../lib/utils");
var nodemailer = require("nodemailer");
var generate = require("./genStr");
var sha256 = require("js-sha256").sha256;
var sendMail = require("./mail");
const path = require("path");
var moment = require("moment");

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, "g"), replacement);
};

function convertDate(date) {
    function pad(s) {
        return s < 10 ? "0" + s : s;
    }

    let convert_d = new Date(date);
    return (
        pad(convert_d.getDate()) +
        "/" +
        pad(convert_d.getMonth()) +
        "/" +
        convert_d.getFullYear() +
        " " +
        pad(convert_d.getHours()) +
        ":" +
        pad(convert_d.getMinutes()) +
        ":" +
        pad(convert_d.getSeconds())
    );
}
class UserProvider {
    UserProvider() {}

    async registerUser(user) {
        user.created = new Date();
        user.updated = new Date();
        user.isactive = false;
        user.isblock = false;
        console.log(user);
        user.password = sha256(user.password);
        let _user = await Users.create(user)
            .then(val => {
                return {
                    success: true,
                    content: val
                };
            })
            .catch(err => {
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
            let createKey = await ActiveUser.create(active)
                .then(val => {
                    return {
                        success: true
                    };
                })
                .catch(err => {
                    return {
                        success: false,
                        content: err
                    };
                });
            if (createKey.success) {
                let web_port =
                    config.web.port !== null && config.web.port !== undefined ?
                    ":" + config.web.port :
                    "";
                let url =
                    config.web.protocal +
                    "://" +
                    config.web.host +
                    web_port +
                    "/activeuser?key=" +
                    active.key;
                let template_html = fs.readFileSync(
                    path.resolve(
                        __dirname,
                        "../../public/template/active-user/content.html"
                    ),
                    "utf8"
                );
                template_html = template_html.replaceAll(
                    "{{name}}",
                    _user.content.firstname + " " + _user.content.lastname
                );
                template_html = template_html.replaceAll("{{action_url}}", url);
                return await sendMail(
                        active.email,
                        "Kích hoạt tài khoản | Pidrun Team",
                        "Kích hoạt tài khoản",
                        template_html
                    )
                    .then(() => {
                        return true;
                    })
                    .catch(err => {
                        return false;
                    });
            }
        } else {
            return await _user;
        }
    }

    async activeUser(key) {
        let current_dt = new Date();
        let find = await ActiveUser.findOne({
                    key: key
                },
                (err, res) => {
                    return res;
                }
            )
            .then(val => {
                return {
                    success: true,
                    content: val
                };
            })
            .catch(err => {
                return {
                    success: false,
                    content: err
                };
            });
        if (find.content.success) {
            let max_time = find.content.updated.setMinutes(find.getMinutes() + 30);
            if (current_dt >= find.content.updated && current_dt <= max_time) {
                return await Users.findByIdAndUpdate(
                        find.content.content.UserId, {
                            isactive: true
                        },
                        (err, res) => {}
                    )
                    .then(() => {
                        return {
                            sucess: true,
                            content: "Active user success"
                        };
                    })
                    .catch(err => {
                        return {
                            sucess: false,
                            content: err
                        };
                    });
            } else {
                await ActiveUser.findByIdAndDelete(find.content._id, (err, res) => {})
                    .then(() => {
                        return {
                            sucess: false,
                            content: "Active Time Out"
                        };
                    })
                    .catch(err => {
                        return {
                            sucess: false,
                            content: err
                        };
                    });
            }
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
                email: email
            },
            (err, res) => {
                return res;
            }
        );
    }
    async findUsrById(id) {
        return await Users.findById(id, (err, res) => {
            return res;
        });
    }

    async login(email, pass) {
        console.log(pass);
        let find = await Users.findOne({
                    email: email
                },
                (err, res) => {
                    return res;
                }
            )
            .then(val => {
                return {
                    success: true,
                    content: val
                };
            })
            .catch(err => {
                return {
                    success: false,
                    content: err
                };
            });

        if (find == null || find == undefined) {
            return await new Object({
                success: false,
                content: "User not exist"
            });
        }
        console.log(find);
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
                    email: email
                }, {
                    key: key,
                    updated: new Date()
                },
                (err, res) => {
                    return res;
                }
            )
            .then(val => {
                return {
                    success: true,
                    content: val
                };
            })
            .catch(err => {
                return {
                    success: false,
                    content: err
                };
            });
        if (find.success) {
            let web_port =
                config.web.port !== null && config.web.port !== undefined ?
                ":" + config.web.port :
                "";
            let url =
                config.web.protocal +
                "://" +
                config.web.host +
                web_port +
                "/activeuser?key=" +
                key;
            let _user = await Users.findOne({
                email: email
            }).then(val => {
                return val;
            });
            var receiver =
                _user.firstname !== null || _user.lastname !== null ?
                _user.firstname + " " + _user.lastname :
                _user.email;
            let template_html = fs.readFileSync(
                path.resolve(
                    __dirname,
                    "../../public/template/active-user/content.html"
                ),
                "utf8"
            );
            template_html = template_html.replaceAll("{{name}}", receiver);
            template_html = template_html.replaceAll("{{action_url}}", url);
            return await sendMail(
                    email,
                    "Kích hoạt tài khoản | Pidrun Team",
                    "Kích hoạt tài khoản",
                    template_html
                )
                .then(() => {
                    return { success: true, content: "Resend success" };
                })
                .catch(err => {
                    return { success: false, content: "Resend unsuccess" };
                });
        } else {
            return await find;
        }
    }

    async requestForget(email, info) {
        let key = generate(50);
        let template_html = fs.readFileSync(
            path.resolve(
                __dirname,
                "../../public/template/password-reset/content.html"
            ),
            "utf8"
        );
        let web_port =
            config.web.port !== null && config.web.port !== undefined ?
            ":" + config.web.port :
            "";
        let url =
            config.web.protocal +
            "://" +
            config.web.host +
            web_port +
            "/forgetpass/index?key=" +
            key;
        let user = await Users.findOne({ email: email })
            .select("_id email firstname lastname")
            .then(val => {
                return val;
            })
            .catch(err => {
                return null;
            });
        if (user == null) {
            return await new Object({ success: false, content: "user not found" });
        }
        let receiver =
            user.firstname !== null || user.lastname !== null ?
            user.firstname + " " + user.lastname :
            user.email;
        template_html = template_html.replaceAll("{{name}}", receiver);
        template_html = template_html.replaceAll("{{action_url}}", url);
        template_html = template_html.replaceAll(
            "{{user_ip}}",
            info !== null && info !== undefined ? info.query : "unknown-location"
        );
        template_html = template_html.replaceAll(
            "{{user_location}}",
            info !== null && info !== undefined ? info.city : "unknown-location"
        );
        let find = await ForgetPassword.findOneAndUpdate({ email: email }, {
                key: key,
                updated: new Date(),
                requestInfo: info
            })
            .then(val => {
                return val;
            })
            .catch(err => {
                return null;
            });
        if (find === undefined || find === null) {
            console.log(user);
            let newReq = new ForgetPassword();
            newReq.email = email;
            newReq.key = key;
            newReq.UserId = user._id;
            newReq.created = new Date();
            newReq.updated = new Date();
            newReq.requestInfo = info;
            return await ForgetPassword.create(newReq)
                .then(async val => {
                    return await sendMail(
                            email,
                            "Quên mật khẩu | Pidrun Team",
                            "Quên mật khẩu",
                            template_html
                        )
                        .then(() => {
                            return { success: true, content: "Resend success" };
                        })
                        .catch(err => {
                            return { success: false, content: "Resend unsuccess" };
                        });
                })
                .catch(err => {
                    console.log(err);
                    return { success: false, content: "create email error!!!" };
                });
        } else {
            return await sendMail(
                    email,
                    "Quên mật khẩu | Pidrun Team",
                    "Quên mật khẩu",
                    template_html
                )
                .then(() => {
                    return { success: true, content: "Resend success" };
                })
                .catch(err => {
                    return { success: false, content: "Resend unsuccess" };
                });
        }
    }

    async checkKeyForget(key) {
        return await ForgetPassword.findOne({ key: key })
            .then(async val => {
                if (val !== undefined && val !== null) {
                    let compareDate = val.updated.setDate(val.updated.getDate() + 1);
                    let currentDate = new Date();
                    if (currentDate > compareDate) {
                        await ForgetPassword.deleteOne({ _id: val._id });
                        return await new Object({ success: false, content: "Time out" });
                    }
                    return await new Object({ success: true, content: "Found" });
                }
                return await new Object({ success: false, content: "Not found" });
            })
            .catch(err => {
                return { success: false, content: "Something happen" };
            });
    }

    async forgetPass(key, newPassword) {
        let find = await ForgetPassword.findOne({ key: key })
            .then(val => {
                return val;
            })
            .catch(err => {
                return null;
            });
        if (find !== undefined && find !== null) {
            let compareDate = find.updated.setDate(find.updated.getDate() + 1);
            let currentDate = new Date();
            if (currentDate > compareDate) {
                await ForgetPassword.deleteOne({ _id: find._id });
                return await new Object({ success: false, content: "Time out" });
            }
            await ForgetPassword.deleteOne({ _id: find._id });
            return await Users.findOneAndUpdate({ _id: find.UserId }, { password: sha256(newPassword) }).then(val => {
                return { success: true, content: "Update password success" };
            });
        } else {
            return await new Object({ success: false, content: "Not found" });
        }
    }

    res_for(obj) {}

    //Request Add friend
    async reqAddFriend(id) {}

    //Add Contact
    async addContact(UserId, ContactId) {
        let contact = new UserContact();
        contact.UserId = UserId;
        contact.ContactId = ContactId;
        contact.created = new Date();
        contact.updated = new Date();
        UserContact.create(contact);
        return await new Object({ success: true, content: "" });
    }

    async returnObj(Obj) {
        console.log(Obj);
        return await Obj;
    }

    //This function use callback to post back data
    async getContact(UserId, NextUsrId = null, Length = 20, callback) {
        console.log(UserId);
        if (Length > 20) {
            return await new Object({
                success: false,
                content: "Maximum length users"
            });
        }
        let lstIdContact = null;
        if (NextUsrId == null || NextUsrId == undefined) {
            lstIdContact = await UserContact.find({ UserId: UserId })
                .limit(Length)
                .then(val => {
                    let lstId = [];
                    val.forEach((item, index) => {
                        lstId.push(item.ContactId);
                    });
                    return { success: true, content: lstId };
                })
                .catch(err => {
                    return { success: false, content: err };
                });
        } else if (NextUsrId !== null || NextUsrId !== undefined) {
            lstIdContact = await UserContact.find({
                    UserId: UserId,
                    _id: { $gt: NextUsrId }
                })
                .sort({ _id: 1 })
                .limit(Length)
                .then(val => {
                    let lstId = [];
                    val.forEach((item, index) => {
                        lstId.push(item.ContactId);
                    });
                    return { success: true, content: lstId };
                })
                .catch(err => {
                    return { success: false, content: err };
                });
        }
        console.log(lstIdContact);
        if (lstIdContact.success) {
            let arr = lstIdContact.content;
            let _this = this;
            await Users.find()
                .where("_id")
                .in(arr)
                .exec((err, res) => {
                    let arr = res;
                    let lstUsr = [];
                    let jsonArray = JSON.parse(JSON.stringify(arr));
                    jsonArray.forEach((item, index) => {
                        let info = new Object({
                            _id: item._id,
                            firstname: item.firstname,
                            lastname: item.lastname,
                            email: item.email
                        });
                        lstUsr.push(info);
                    });
                    console.log(lstUsr);
                    callback(new Object({ success: true, content: lstUsr }));
                });
        } else {
            callback(lstIdContact);
        }
    }

    async searchUser(keyword, Length = 20) {
        return await Users.aggregate(
            [{
                    $project: {
                        fullname: { $concat: ["$firstname", " ", "$lastname"] },
                        email: "$email",
                        firstname: "$firstname",
                        lastname: "$lastname"
                    }
                },
                // Match first to reduce documents to those where the array contains the match
                {
                    $match: {
                        $or: [{
                                fullname: { $regex: keyword, $options: "i" }
                            },
                            {
                                email: { $regex: keyword, $options: "i" }
                            }
                        ]
                    }
                },

                // Unwind to "de-normalize" the document per array element
                { $unwind: "$fullname" },
                { $unwind: "$email" },

                // Now filter those document for the elements that match
                {
                    $match: {
                        $or: [{
                                fullname: { $regex: keyword, $options: "i" }
                            },
                            {
                                email: { $regex: keyword, $options: "i" }
                            }
                        ]
                    }
                },
                // Group back as an array with only the matching elements
                {
                    $group: {
                        _id: "$_id",
                        email: { $first: "$email" },
                        firstname: { $first: "$firstname" },
                        lastname: { $first: "$lastname" }
                        // title: { $first: "$title" },
                        // authors: { $push: "$authors" },
                        // subjects: { $first: "$subjects" }
                    }
                }
            ],
            (err, val) => {
                console.log(val);
            }
        );
    }
    async updateInfo(UserId, UserInfo) {
        console.log(UserInfo);
        let updateUsr = new Users();
        updateUsr = await Users.findOne({ _id: UserId }).
        select("_id email firstname lastname birthday gender").
        then(val => { return val }).
        catch(err => { return null });
        updateUsr.email = (utils.isEmpty(UserInfo.email)) ? (updateUsr.email) : (UserInfo.email);
        updateUsr.firstname = (utils.isEmpty(UserInfo.firstname)) ? (updateUsr.firstname) : (UserInfo.firstname);
        updateUsr.lastname = (utils.isEmpty(UserInfo.lastname)) ? (updateUsr.lastname) : (UserInfo.lastname);
        updateUsr.birthday = (utils.isEmpty(UserInfo.birthday)) ? (updateUsr.birthday) : (UserInfo.birthday);
        updateUsr.gender = (utils.isEmpty(UserInfo.gender)) ? (updateUsr.gender) : (UserInfo.gender);
        let query = { $set: updateUsr }
        return await Users.updateOne({ _id: UserId }, query).then(val => {
            return { success: true, content: val };
        }).catch(err => {
            return { success: false, content: "user is not updated" }
        })
    }
    async updatePass(UserId, OldPass, NewPass) {
        let user = await Users.findOne({ _id: UserId }).select("_id password").then(val => { return val }).catch(err => { return null });
        if (sha256(OldPass) !== user.password) {
            return await new Object({ success: false, content: "Your password is not correct" });
        }
        return await Users.updateOne({ _id: UserId }, { password: sha256(NewPass) }).then(val => {
            return { success: true, content: "Your password is updated" }
        }).catch(err => {
            return { success: false, content: "Your password is not updated" }
        })
    }

    async updateImage(userid, usr_image) {
        console.log(usr_image);
        console.log(userid);
        return await Users.updateOne({ _id: userid }, { image: usr_image }).then(val => {
            console.log(val);
            return { success: true, content: "Update success" }
        }).catch(err => {
            return { success: false, content: "Update not success" }
        })
    }

    async generateURL() {
        let lstId = await Users.find().select("_id").then(val => {
                return val
            }).catch(err => {
                return [];
            })
            // lstId.forEach((item, index) => {
            //     fs.mkdirSync(config.getHost("Img_Att") + "\\" + item._id);
            // })
        lstId.forEach(async(item) => {
            await Users.updateOne({ _id: item._id }, { image: "\\\\" + item._id + "\\\\" + item._id + ".png" }).then(val => { console.log(val) });
        })
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
    // _provider.searchUser("Pidrun").then(val => {
    //   console.log(val);
    // });
    // let exc = _provider.registerUser(user);
    // exc.then(val => {
    //     console.log(val)
    // }).catch(err => console.log(err));
    // var x = _provider.login("davidarchuleta789@gmail.com", "abc@123");
    //   var x = _provider.requestActive("davidarchuleta789@gmail.com");
    //   x.then(val => {
    //     console.log(val);
    //   });
    // console.log(new UserProvider().getAllUser());
    // _provider.getContact("5d51347486f7b41cbc039314", null, 10, function(Obj) {
    //   console.log(Obj);
    // });
    //console.log(num);
    // let obj = {
    //   businessName: "",
    //   businessWebsite: "",
    //   city: "Ho Chi Minh City",
    //   continent: "Asia",
    //   country: "Vietnam",
    //   countryCode: "VN",
    //   ipName: "localhost",
    //   ipType: "Residential",
    //   isp: "Viettel Group",
    //   lat: "10.82302",
    //   lon: "106.62965",
    //   org: "Viettel Group",
    //   query: "27.74.255.96",
    //   region: "Ho Chi Minh",
    //   status: "success"
    // };
    // _provider.requestForget("davidarchuleta789@gmail.com", obj).then(val => {
    //   console.log(val);
    // });
    // _provider.generateURL().then(val => { console.log(val) });
} catch (error) {
    console.log(error);
}