const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://127.0.0.1/Pidrun", {
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
    Messsages.create(mess);
    //  if (Attachment.length < 0) {

    //  }
    return await new Object({ success: true, content: "" });
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
// _provider.getMessage("5d82188f146e1954508b9b2c", null, 10).then(val => {
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

_provider
  .createCnver(
    "",
    ["5d51347486f7b41cbc039314", "5d708885f5c4952698cdd075"],
    "5d51347486f7b41cbc039314"
  )
  .then(val => {
    console.log(val);
  });
