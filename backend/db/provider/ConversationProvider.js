const mongoose = require("mongoose");
const custom_config = require("../../lib/config");
mongoose.set("useCreateIndex", true);
mongoose.connect(custom_config.mongodb_url.path, {
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
    conVer.lastMessageId = null;
    conVer.lastMessageTime = new Date();
    let create = await Conversation.create(conVer)
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
    if (create.success) {
      console.log(create);
      lstUsr.forEach(item => {
        let participants = new Participants();
        participants.ConversationId = create.content._id;
        participants.UserId = item;
        participants.isDisabled = false;
        participants.created = new Date();
        participants.updated = new Date();
        // participants.lstUsr.push(item);
        Participants.create(participants)
          .then(val => {
            return true;
          })
          .catch(err => {
            return false;
          });
      });
      return await true;
    } else {
      return await false;
    }
  }

  //Find conversation and add user to this conversation
  async addMemToCon(ConId, UserId) {
    let par = await Participants.find(
      {
        UserId: UserId
      },
      (err, res) => {
        console.log(err);
        return res;
      }
    )
      .then(val => {
        return val;
      })
      .catch(err => {
        return false;
      });
    if ((par == undefined || par == null) && par != false) {
      //Create group for new user add
      let crt_par = new Participants();
      crt_par.ConversationId = ConId;
      crt_par.UserId = UserId;
      crt_par.isDisabled = false;
      crt_par.created = new Date();
      crt_par.updated = new Date();
      return await Participants.create(crt_par)
        .then(() => {
          return true;
        })
        .catch(err => {
          return false;
        });
    }
    if (par != false) {
      return await Participants.findOneAndUpdate(
        {
          UserId: UserId
        },
        {
          isDisabled: false
        },
        (err, res) => {
          return true;
        }
      )
        .then(val => {
          return true;
        })
        .catch(err => {
          return false;
        });
    }
    return await false;
  }

  //Remove member of group chat
  async rmMemFrGr(ConId, UserId) {
    return await Participants.findOneAndUpdate(
      {
        ConversationId: ConId,
        UserId: UserId
      },
      {
        isDisabled: true,
        updated: new Date()
      },
      (err, res) => {
        return true;
      }
    )
      .then(val => {
        return true;
      })
      .catch(err => {
        return false;
      });
  }

  async getConMem(ConId, isAll = false) {
    let lstUsr = [];
    lstUsr = await Conversation.find(
      {
        ConversationId: ConId
      },
      (err, res)
    )
      .then(val => {
        return val;
      })
      .catch(err => {
        return [];
      });
    if (isAll == false) {
      lstUsr = lstUsr.filter(item => {
        return item.isDisabled == false;
      });
    }
    let memInfo = [];
    lstUsr.forEach(item => {
      let usr = Users.findById(item, (err, res) => {
        return res;
      })
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
        })
        .select({
          _id: 1,
          firstname: 1,
          lastname: 1
        });

      memInfo.push(usr);
    });
    return await memInfo;
  }

  async SendMessage(ConId, UserId, Mess, Attachment = "") {
    let mess = new Messsages();
    mess.ConversationId = ConId;
    mess.SenderId = UserId;
    mess.message = Mess;
    mess.created = new Date();
    mess.updated = new Date();
    return await Messsages.create(mess).then(async val => {
      let query = await Conversation.findByIdAndUpdate(ConId, {
        lastMessageTime: new Date(),
        lastMessageId: val._id
      })
        .then(val => {
          return { success: true, content: val };
        })
        .catch(err => {
          {
            return { success: true, content: err };
          }
        });
      if (query.success) {
        return { success: true, content: "Create sucess" };
      }
      return { success: false, content: query.content };
    });

    //  if (Attachment.length < 0) {

    //  }
  }

  //Get message of conversation
  //Every time when featch data, api only get 20 message
  //This api in Web  base
  //In mobile base is 10 message
  async getMessage(ConverId, MessId = null, Length = 20) {
    if (Length > 20) {
      return await new Object({
        success: false,
        content: "Maximum length message"
      });
    }
    if (MessId == null || MessId == undefined) {
      return await Messsages.find({ ConversationId: ConverId })
        .sort({ created: "desc" })
        .limit(Length)
        .then(val => {
          return { success: true, content: val };
        });
    }
    return await Messsages.find({
      ConversationId: ConverId,
      _id: { $gt: MessId }
    })
      .sort({ _id: 1, created: "desc" })
      .limit(length)
      .then(val => {
        return { success: false, content: val };
      });
  }
  async getConv(UserId, NextId = null, Length = 20, callback) {
    if (Length > 20) {
      callback({
        success: false,
        content: "Maximum length message"
      });
      return;
    }
    let mess = [];
    let conId = [];
    let lstIdCon = await Participants.find({ UserId: UserId }, (err, res) => {
      console.log(err);
    })
      .select("ConversationId")
      .then(val => {
        let listId = [];
        val.forEach((item, index) => {
          listId.push(item.ConversationId);
        });
        return { success: true, content: listId };
      })
      .catch(err => {
        return { success: false, content: err };
      });
    //Get first 20 conversations recently chat
    if (NextId == null || NextId == undefined) {
      //console.log(lstIdCon);
      if (lstIdCon.success) {
        await Conversation.where({ _id: { $in: lstIdCon.content } })
          .sort({ lastMessageTime: "desc" })
          .limit(Length)
          .exec(async (err, res) => {
            let messId = [];
            res.forEach((item, index) => {
              messId.push(item.lastMessageId);
            });
            let lstMess = await Messsages.find({ _id: { $in: messId } })
              .then(val => {
                return val;
              })
              .catch(err => {
                return false;
              });
            if (lstMess != false) {
              for (let i = 0; i < res.length; i++) {
                res[i].mess = lstMess.find((val, index) => {
                  return (
                    JSON.stringify(res[i]._id) ==
                    JSON.stringify(val.ConversationId)
                  );
                });
              }
              //console.log(res);
              callback(res);
            } else {
              callback(
                new Object({
                  success: false,
                  content: "Some thing wrong happen"
                })
              );
            }
          });
        return;
      }
      callback(
        new Object({
          success: false,
          content: "Don't have any conversation"
        })
      );
      return;
    }
    //Get next 20 conversations recently chat
    await Conversation.where({ _id: { $in: lstIdCon.content } })
      .sort({ lastMessageTime: "desc" })
      //.where({ _id: { $gt: NextId } })
      //.limit(Length)
      .select("_id")
      .exec(async (err, res) => {
        let arrConId = [];
        res.forEach((item, index) => {
          arrConId.push(item._id);
        });
        let to = arrConId.findIndex(val => {
          return JSON.stringify(val) == JSON.stringify(NextId);
        });
        arrConId.splice(0, to + 1);
        await Conversation.where({ _id: { $in: arrConId } })
          .sort({
            lastMessageTime: "desc"
          })
          .limit(Length)
          .exec(async (err, res) => {
            let messId = [];
            res.forEach((item, index) => {
              messId.push(item.lastMessageId);
            });
            let lstMess = await Messsages.find({ _id: { $in: messId } })
              .then(val => {
                return val;
              })
              .catch(err => {
                return false;
              });
            if (lstMess != false) {
              for (let i = 0; i < res.length; i++) {
                res[i].mess = lstMess.find((val, index) => {
                  return (
                    JSON.stringify(res[i]._id) ==
                    JSON.stringify(val.ConversationId)
                  );
                });
              }
              //console.log(res);
              callback(res);
            } else {
              callback(
                new Object({
                  success: false,
                  content: "Some thing wrong happen"
                })
              );
            }
          });
      });
  }
}

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

let _provider = new ConversationProvider();
// Participants.deleteOne({ _id: "5d82188f146e1954508b9b2d" }).then(val =>
//   console.log(val)
// );
// _provider.getMessage("5d836eb86408de44c79391f2", null, 10).then(val => {
//   if (!val.success) {
//     console.log(val.content);
//     return;
//   }
//   let arr = val.content;
//   jsonArray = JSON.parse(JSON.stringify(arr));
//   jsonArray.forEach((item, index) => {
//     console.log(item._id + " Date: " + convertDate(item.created));
//   });
// });
// _provider
//   .SendMessage(
//     "5d836eb86408de44c79391f2",
//     "5d51347486f7b41cbc039314",
//     "Hello anh da den"
//   )
//   .then(val => {
//     console.log(val);
//   });
_provider.getConv("5d51347486f7b41cbc039314", null, 20, val => {
  val.forEach((val, index) => {
    console.log(
      val._id + " " + convertDate(val.lastMessageTime) + " " + val.mess.message
    );
  });
});

// _provider
//   .SendMessage(
//     "5d9469086b8ed33aa3068652c",
//     "5d51347486f7b41cbc039314",
//     "Hello AAA AAA 11.1"
//   )
//   .then(val => {
//     console.log(val);
//   });
