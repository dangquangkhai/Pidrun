const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://127.0.0.1/Pidrun', {
    useNewUrlParser: true
});
var db = mongoose.connection;
const Users = require("../model/Users");
const ActiveUser = require("../model/ActiveUser");
const Conversation = require("../model/Conversation");
const Messsages = require("../model/Messages");
const DeletedMessage = require("../model/DeletedMessage");
const DeletedConversation = require("../model/DeletedConversation");
const Participants = require("../model/Participants");

class ConversationProvider {

    //Create conversation
    //Conversation can be one to one message or many to many message
    async createCnver(groupName, lstUsr, UserId) {
        //Create a conversation
        let conVer = new Conversation();
        conVer.title = groupName;
        conVer.creator = UserId;
        conVer.created = new Date();
        conVer.updated = new Date();
        let create = await Conversation.create(conVer).then(val => {
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
        if (create.success) {
            lstUsr.forEach((item) => {
                let participants = new Participants();
                participants.ConversationId = create.val._id;
                participants.UserId = item;
                participants.isDisabled = false;
                participants.created = new Date();
                participants.updated = new Date();
                // participants.lstUsr.push(item);
                await Participants.create(participants).then(val => {
                    return true
                }).catch(err => {
                    return false
                });
            });
            return await true;
        } else {
            return await false;
        }
    }

    //Find conversation and add user to this conversation
    async addMemToCon(ConId, UserId) {
        let par = await Participants.find({
            UserId: UserId
        }, (err, res) => {
            console.log(err);
            return res;
        }).then(val => {
            return val
        }).catch(err => {
            return false
        });
        if ((par == undefined || par == null) && par != false) {
            //Create group for new user add
            let crt_par = new Participants();
            crt_par.ConversationId = ConId;
            crt_par.UserId = UserId;
            crt_par.isDisabled = false;
            crt_par.created = new Date();
            crt_par.updated = new Date();
            return await Participants.create(crt_par).then(() => {
                return true
            }).catch(err => {
                return false
            });
        }
        if (par != false) {
            return await Participants.findOneAndUpdate({
                UserId: UserId
            }, {
                isDisabled: false
            }, (err, res) => {
                return true
            }).then(val => {
                return true
            }).catch(err => {
                return false
            });
        }
        return await false;
    }

    //Remove member of group chat
    async rmMemFrGr(ConId, UserId) {
        return await Participants.findOneAndUpdate({
            ConversationId: ConId,
            UserId: UserId
        }, {
            isDisabled: true,
            updated: new Date()
        }, (err, res) => {
            return true
        }).then(val => {
            return true
        }).catch(err => {
            return false
        });
    }

    async getConMem(ConId, isAll = false) {
        let lstUsr = [];
        lstUsr = await Conversation.find({
            ConversationId: ConId
        }, (err, res)).then(val => {
            return val
        }).catch(err => {
            return []
        });
        if (isAll == false) {
            lstUsr = lstUsr.filter((item) => {
                return item.isDisabled == false;
            })
        }
        let memInfo = [];
        lstUsr.forEach(item => {
            let usr = await Users.findById(item, (err, res) => {
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
            }).select({
                _id: 1,
                firstname: 1,
                lastname: 1
            });

            memInfo.push(usr);
        });
        return await memInfo;
    }

    async SendMessage(ConId, UserId, Mess, Attachment)
    {
        let mess = new Messsages();
        mess.ConversationId = ConId;
        mess.SenderId = UserId;
        mess.message = Mess;
        mess.created = new Date();
        mess.updated = new Data();
        Messsages.create(mess); 
        //  if (Attachment.length < 0) {
     
        //  }
        return await new Object({success: true, content: ""}); 
    }


}
