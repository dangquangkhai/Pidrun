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

const utils = require("../../lib/utils");
const path = require("path");

class ConversationProvider {
  //Create conversation
  //Conversation can be one to one message or many to many message
  async createCnver(groupName, lstUsr, UserId, conType) {
    //Create a conversation
    let conVer = new Conversation();
    conVer.title = groupName;
    conVer.creator = UserId;
    conVer.created = new Date();
    conVer.updated = new Date();
    conVer.lastMessageId = null;
    conVer.lastMessageTime = new Date();
    conVer.conType = conType;
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
        return { success: true, content: val };
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
    let listOutput = [];
    let listMess = [];
    let listSenderId = [];
    let listSender = [];
    let condition = null;
    let sort = null;
    if (MessId == null || MessId == undefined) {
      condition = { ConversationId: ConverId };
      sort = { created: "desc" };
      // query = await Messsages.find({ ConversationId: ConverId }).sort({
      //   created: "desc"
      // });
    } else {
      condition = {
        ConversationId: ConverId,
        _id: { $lt: MessId }
      };
      sort = { _id: -1, created: "desc" };
      // query = await Messsages.find({
      //   ConversationId: ConverId,
      //   _id: { $gt: MessId }
      // }).sort({ _id: 1, created: "desc" });
    }
    listMess = await Messsages.find(condition)
      .sort(sort)
      .limit(Length)
      .then(val => {
        return val;
      });
    listMess.forEach((item, index) => {
      listSenderId.push(item.SenderId);
    });
    listSender = await Users.find({ _id: { $in: listSenderId } })
      .select("_id email firstname lastname image")
      .then(val => {
        return val;
      });
    //console.log(listSender);
    for (let i = 0; i < listMess.length; i++) {
      let mess = new Object(listMess[i]);
      let sender = new Object(
        JSON.parse(
          JSON.stringify(
            listSender.find((item, index) => {
              return JSON.stringify(item._id) == JSON.stringify(mess.SenderId);
            })
          )
        )
      );
      sender.image =
        sender.image !== "" &&
        sender.image !== null &&
        sender.image !== undefined
          ? utils.encodeUrl(sender.image)
          : utils.encodeUrl(
              path.resolve(__dirname, "../../public/images/") +
                "/default-avatar.jpg"
            );
      listOutput.push(
        new Object({
          mess: mess,
          sender: sender
        })
      );
    }
    return await new Object({ success: true, content: listOutput });
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
            let lstUsrId = [];
            let lstConId = [];

            //Get last message sender Id and list conversation id
            res.forEach((item, index) => {
              messId.push(item.lastMessageId);
              lstConId.push(item._id);
            });
            // get user info for newest message
            let lstMess = await Messsages.find({ _id: { $in: messId } })
              .then(val => {
                return val;
              })
              .catch(err => {
                return false;
              });
            lstMess.forEach(val => {
              lstUsrId.push(val.SenderId);
            });

            let parIdOfCon = await Participants.find({
              ConversationId: { $in: lstConId },
              UserId: { $ne: UserId }
            })
              .select("ConversationId UserId")
              .then(val => {
                return val;
              })
              .catch(err => {
                return [];
              });
            let parOfCon = [];
            parIdOfCon.forEach(item => {
              parOfCon.push(item.UserId);
            });
            let finalParInfo = await Users.find({ _id: { $in: parOfCon } })
              .select("_id email firstname lastname image")
              .then(val => {
                let ouput = [];
                for (let i = 0; i < parOfCon.length; i++) {
                  ouput.push(
                    new Object({
                      conId: parIdOfCon[i].ConversationId,
                      usr: val[i]
                    })
                  );
                }
                return ouput;
              })
              .catch(err => {
                return [];
              });
            let lstUsrInfo = await Users.find({ _id: { $in: lstUsrId } })
              .select("_id email firstname lastname")
              .then(val => {
                return val;
              })
              .catch(err => {
                return false;
              });
            if (lstMess != false) {
              let lstOutput = [];
              for (let i = 0; i < res.length; i++) {
                let mess = lstMess.find((val, index) => {
                  return (
                    JSON.stringify(res[i]._id) ==
                    JSON.stringify(val.ConversationId)
                  );
                });
                let senderInfo = lstUsrInfo.find((val, index) => {
                  return (
                    JSON.stringify(mess.SenderId) == JSON.stringify(val._id)
                  );
                });
                let par = [];
                finalParInfo.forEach(val => {
                  if (JSON.stringify(val.conId) == JSON.stringify(res[i]._id)) {
                    par.push(val.usr);
                  }
                });
                let conversation = new Object(res[i]);
                switch (conversation.conType) {
                  case "PrivateChat":
                    let parti = new Object(par[0]);
                    parti.image =
                      parti.image !== null &&
                      parti.image !== undefined &&
                      parti.image !== ""
                        ? parti.image
                        : path.resolve(__dirname, "../../public/images/") +
                          "/default-avatar.jpg";
                    conversation.image = utils.encodeUrl(parti.image);
                    break;
                  case "GroupChat":
                    conversation.image =
                      conversation.image !== null &&
                      conversation.image !== undefined &&
                      conversation.image !== ""
                        ? utils.encodeUrl(conversation.image)
                        : utils.encodeUrl(
                            path.resolve(__dirname, "../../public/images/") +
                              "/default-group.png"
                          );
                    break;
                }
                for (let i = 0; i < par.length; i++) {
                  par[i].image = null;
                }
                lstOutput.push(
                  new Object({
                    conversation: conversation,
                    mess: mess,
                    senderInfo: senderInfo,
                    par: par
                  })
                );
              }
              //console.log(res);
              callback(new Object({ success: true, content: lstOutput }));
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
            let lstUsrId = [];
            let lstConId = [];
            res.forEach((item, index) => {
              messId.push(item.lastMessageId);
              lstConId.push(item._id);
            });
            let lstMess = await Messsages.find({ _id: { $in: messId } })
              .then(val => {
                return val;
              })
              .catch(err => {
                return false;
              });
            lstMess.forEach(val => {
              lstUsrId.push(val.SenderId);
            });

            let parIdOfCon = await Participants.find({
              ConversationId: { $in: lstConId },
              UserId: { $ne: UserId }
            })
              .select("ConversationId UserId")
              .then(val => {
                return val;
              })
              .catch(err => {
                return [];
              });
            let parOfCon = [];
            parIdOfCon.forEach(item => {
              parOfCon.push(item.UserId);
            });
            let finalParInfo = await Users.find({
              _id: { $in: parOfCon }
            })
              .select("_id email firstname lastname")
              .then(val => {
                let ouput = [];
                for (let i = 0; i < parOfCon.length; i++) {
                  ouput.push(
                    new Object({
                      conId: parIdOfCon[i].ConversationId,
                      usr: val[i]
                    })
                  );
                }
                return ouput;
              })
              .catch(err => {
                return [];
              });
            let lstUsrInfo = await Users.find({
              _id: { $in: lstUsrId }
            })
              .select("_id email firstname lastname")
              .then(val => {
                return val;
              })
              .catch(err => {
                return false;
              });
            if (lstMess != false) {
              let lstOutput = [];
              for (let i = 0; i < res.length; i++) {
                let mess = lstMess.find((val, index) => {
                  return (
                    JSON.stringify(res[i]._id) ==
                    JSON.stringify(val.ConversationId)
                  );
                });
                let senderInfo = lstUsrInfo.find((val, index) => {
                  return (
                    JSON.stringify(mess.SenderId) == JSON.stringify(val._id)
                  );
                });
                let par = [];
                finalParInfo.forEach(val => {
                  if (JSON.stringify(val.conId) == JSON.stringify(res[i]._id)) {
                    par.push(val.usr);
                  }
                });
                let conversation = new Object(res[i]);
                switch (conversation.conType) {
                  case "PrivateChat":
                    let parti = new Object(par[0]);
                    parti.image =
                      parti.image !== null &&
                      parti.image !== undefined &&
                      parti.image !== ""
                        ? parti.image
                        : path.resolve(__dirname, "../../public/images/") +
                          "/default-avatar.jpg";
                    conversation.image = utils.encodeUrl(parti.image);
                    break;
                  case "GroupChat":
                    conversation.image =
                      conversation.image !== null &&
                      conversation.image !== undefined &&
                      conversation.image !== ""
                        ? utils.encodeUrl(conversation.image)
                        : utils.encodeUrl(
                            path.resolve(__dirname, "../../public/images/") +
                              "/default-group.png"
                          );
                    break;
                }
                for (let i = 0; i < par.length; i++) {
                  par[i].image = null;
                }
                lstOutput.push(
                  new Object({
                    conversation: conversation,
                    mess: mess,
                    senderInfo: senderInfo,
                    par: par
                  })
                );
              }
              //console.log(res);
              callback(new Object({ success: true, content: lstOutput }));
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
module.exports = new ConversationProvider();
let _provider = new ConversationProvider();
// Participants.deleteOne({ _id: "5d82188f146e1954508b9b2d" }).then(val =>
//   console.log(val)
// );
// _provider
//   .getMessage("5d836eb86408de44c79391f2", "5d8b2382144a792ae9005dab", 10)
//   .then(val => {
//     if (!val.success) {
//       console.log(val.content);
//       return;
//     }
//     let arr = val.content;
//     jsonArray = JSON.parse(JSON.stringify(arr));
//     jsonArray.forEach((item, index) => {
//       console.log(item.mess._id + " Date: " + convertDate(item.mess.created));
//     });
//   });
// _provider
//   .SendMessage(
//     "5d836eb86408de44c79391f2",
//     "5d51347486f7b41cbc039314",
//     "Hello anh oi"
//   )
//   .then(val => {
//     console.log(val);
//   });
// _provider.getConv(
//   "5d51347486f7b41cbc039314",
//   "5d9469086b8ed33aa306864e",
//   5,
//   val => {
//     val.forEach((val, index) => {
//       console.log(
//         "Conversation Id:" +
//           val.conversation._id +
//           " - Mess:" +
//           val.mess.message +
//           " - Time: " +
//           convertDate(val.conversation.lastMessageTime)
//       );
//     });
//   }
// );
// (async () => {
//   await Conversation.updateMany(
//     {},
//     { conType: "PrivateChat" },
//     { multi: true }
//   ).then(val => {
//     console.log(val);
//   });
// })();
// _provider
//   .SendMessage(
//     "5d836eb86408de44c79391f2",
//     "5d708885f5c4952698cdd075",
//     "Anh à 😂"
//   )
//   .then(val => {
//     console.log(val);
//   });
// console.log(
//   utils.decodeUrl(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWNtd2lPaUl2YUc5dFpTOXJhR0ZwTDFCeWIycGxZM1J6TDFCcFpISjFiaTlpWVdOclpXNWtMM0IxWW14cFl5OXBiV0ZuWlhNdlpHVm1ZWFZzZEMxaGRtRjBZWEl1YW5Cbklpd2lhV0YwSWpveE5UY3dOREkzT0RjeWZRLnZmTUM4MWJnWDM2YlA5Z1hvSy1ZcHBTVXcwOVNQdWJlNWo4dC1JdFVYdVUiLCJpYXQiOjE1NzA0Mjc4NzJ9.Q3TBV5Ow6jtoBpmE-vfklrcgLexO75MdvkGlhrkiafE"
//   )
// );
