<template>
  <!-- End of Create Chat -->
  <div class="main">
    <div class="tab-content" id="nav-tabContent">
      <!-- Start of Babble -->
      <div
        class="babble tab-pane fade"
        id="list-chat"
        role="tabpanel"
        aria-labelledby="list-chat-list"
        v-if="coninfo !== null && coninfo !== undefined"
      >
        <!-- Start of Chat -->
        <div class="chat" id="chat">
          <div class="top">
            <div class="container">
              <div class="col-md-12">
                <div class="inside">
                  <a href="#">
                    <img
                      class="avatar-md"
                      :src="CON_CONTROLLER + '/getimage/' + coninfo.conversation.image"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Keith"
                      alt="avatar"
                    />
                  </a>
                  <div class="status">
                    <!-- {{coninfo.par[0].status}} -->
                    <i
                      class="material-icons online"
                      v-if="coninfo.conversation.conType == 'PrivateChat' && coninfo.par[0].status == 'Online'"
                    >fiber_manual_record</i>
                    <i
                      class="material-icons offline"
                      v-if="coninfo.conversation.conType == 'PrivateChat' && coninfo.par[0].status == 'Offline'"
                    >fiber_manual_record</i>
                  </div>
                  <div class="data">
                    <h5>
                      <a href="#">{{generateTitle(coninfo)}}</a>
                    </h5>
                    <span
                      v-if="coninfo.conversation.conType == 'PrivateChat' && coninfo.par[0].status == 'Online'"
                    >Hoạt động</span>
                    <span
                      v-if="coninfo.conversation.conType == 'PrivateChat' && coninfo.par[0].status == 'Offline'"
                    >Không hoạt động</span>
                  </div>
                  <button class="btn connect d-md-block d-none" name="1">
                    <i class="material-icons md-30">phone_in_talk</i>
                  </button>
                  <button class="btn connect d-md-block d-none" name="1">
                    <i class="material-icons md-36">videocam</i>
                  </button>
                  <button class="btn d-md-block d-none">
                    <i class="material-icons md-30">info</i>
                  </button>
                  <div class="dropdown">
                    <button
                      class="btn"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="material-icons md-30">more_vert</i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                      <button class="dropdown-item connect" name="1">
                        <i class="material-icons">phone_in_talk</i>Voice Call
                      </button>
                      <button class="dropdown-item connect" name="1">
                        <i class="material-icons">videocam</i>Video Call
                      </button>
                      <hr />
                      <button class="dropdown-item">
                        <i class="material-icons">clear</i>Clear History
                      </button>
                      <button class="dropdown-item">
                        <i class="material-icons">block</i>Block Contact
                      </button>
                      <button class="dropdown-item">
                        <i class="material-icons">delete</i>Delete Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content" id="content">
            <div class="container">
              <div class="col-md-12">
                <div
                  v-for="(item, index) in conMess"
                  :key="'dateKey-' + item.date +'-'+index"
                  :id="'dateId-' + item.date +'-'+index"
                >
                  <div class="date">
                    <hr />
                    <span>{{item.date}}</span>
                    <hr />
                  </div>
                  <div
                    v-for="(subItem, subIndex) in item.child.slice().reverse()"
                    :key="'messKey-' + subItem.mess._id + '-' + subIndex"
                    :id="'messId-' + subItem.mess._id + '-' + subIndex"
                    :class="'message ' + generateClass(subItem, subIndex)"
                  >
                    <img
                      v-if="checkClass(subItem, subIndex)"
                      class="avatar-md"
                      :src="CON_CONTROLLER +'/getimage/' + subItem.sender.image"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Keith"
                      alt="avatar"
                    />
                    <div class="text-main">
                      <div class="text-group">
                        <div :class="'text ' + generateClass(subItem, subIndex)">
                          <p>{{subItem.mess.message}}</p>
                        </div>
                      </div>
                      <span>{{generateTime(subItem, subIndex)}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="col-md-12">
              <div class="bottom">
                <form class="position-relative w-100" v-on:submit.prevent="sendMessage()">
                  <textarea
                    class="form-control"
                    placeholder="Start typing for reply..."
                    rows="1"
                    v-model="message"
                    v-on:keydown.enter.exact.prevent
                    v-on:keyup.enter.exact="sendMessage()"
                    v-on:keydown.enter.shift.exact="newline"
                  ></textarea>
                  <button class="btn emoticons">
                    <i class="material-icons">insert_emoticon</i>
                  </button>
                  <button type="submit" class="btn send" v-on:click="sendMessage()">
                    <i class="material-icons">send</i>
                  </button>
                </form>
                <label>
                  <input type="file" />
                  <span class="btn attach d-sm-block d-none">
                    <i class="material-icons">attach_file</i>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- End of Chat -->
        <!-- Start of Call -->
        <div class="call" id="call1">
          <div class="content">
            <div class="container">
              <div class="col-md-12">
                <div class="inside">
                  <div class="panel">
                    <div class="participant">
                      <img
                        class="avatar-xxl"
                        src="swipe/img/avatars/avatar-female-5.jpg"
                        alt="avatar"
                      />
                      <span>Connecting</span>
                    </div>
                    <div class="options">
                      <button class="btn option">
                        <i class="material-icons md-30">mic</i>
                      </button>
                      <button class="btn option">
                        <i class="material-icons md-30">videocam</i>
                      </button>
                      <button class="btn option call-end">
                        <i class="material-icons md-30">call_end</i>
                      </button>
                      <button class="btn option">
                        <i class="material-icons md-30">person_add</i>
                      </button>
                      <button class="btn option">
                        <i class="material-icons md-30">volume_up</i>
                      </button>
                    </div>
                    <button class="btn back" name="1">
                      <i class="material-icons md-24">chat</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End of Call -->
      </div>
      <!-- End of Babble -->
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Chat",
  props: ["coninfo", "usrinfo"],
  data() {
    return {
      CON_CONTROLLER: this.$api.getApi() + "/conversation",
      conMess: [],
      message: null
    };
  },
  watch: {
    coninfo: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal && newVal !== null) {
          this.getMess(this.coninfo.conversation._id);
          console.log("Change value");
        }
      },
      deep: true
    }
  },
  sockets: {
    // connect() {
    //   console.log("connected to chat server");
    // },
    // count(val) {
    //   this.count = val.count;
    // },
    // message(data) {
    //   // this function gets triggered once a socket event of `message` is received
    //   //this.textarea += data + "\n"; // append each new message to the textarea and add a line break
    //   console.log(data);
    // },
    checkonline(data) {
      //console.log(data);
    },
    checklist(data) {
      this.$forceUpdate();
    },
    sendMess(data) {
      console.log(data);
    },
    receiveMess(data) {
      this.message = null;
      if (data !== null && data !== undefined) {
      }
    }
  },
  methods: {
    getMess(conid, messid = null) {
      this.$http
        .post(this.CON_CONTROLLER + "/getmess", {
          conId: conid,
          messId: messid
        })
        .then(res => {
          let arr = res.data.content;
          // this gives an object with dates as keys
          const groups = arr.reduce((groups, item) => {
            const date = this.$moment(item.mess.created).format("DD/MM/YYYY"); //.split('T')[0];
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(item);
            return groups;
          }, {});
          console.log(groups);
          // Edit: to add it in the array format instead
          const groupArrays = Object.keys(groups).map(date => {
            return {
              date,
              child: groups[date]
            };
          });
          this.conMess = groupArrays.reverse();
          this.showChat();
        });
    },
    showChat() {
      $(document).ready(function() {
        $("#list-chat").addClass("active show");
      });
    },
    generateTitle(item) {
      let title = "";
      switch (item.conversation.conType) {
        case "PrivateChat":
          title = item.par[0].firstname + " " + item.par[0].lastname;
          break;
        case "GroupChat":
          if (
            item.conversation.title !== null &&
            item.conversation.title !== undefined &&
            item.conversation.title !== ""
          ) {
            title = item.conversation.title;
          } else {
            item.par.forEach((val, index) => {
              let fullname = val.par.firstname + " " + val.par.lastname;
              title += fullname + ", ";
            });
          }
          break;
        default: {
          return "";
        }
      }
      return title;
    },
    generateClass(item, index) {
      if (item.mess.SenderId == this.usrinfo._id) {
        return "me";
      }
      return "";
    },
    checkClass(item, index) {
      if (item.mess.SenderId == this.usrinfo._id) {
        return false;
      }
      return true;
    },
    generateTime(item, index) {
      let date = this.$moment(item.mess.created).format("hh:mm A");
      return date;
    },
    sendMessage() {
      let mess = new Object(this.message);
      let obj = {
        _id: this.coninfo.conversation._id,
        mess: this.mess,
        par: this.coninfo.par,
        sender: this.usrinfo._id
      };
      this.message = null;
      this.$socket.emit("sendmessage", obj);
    },
    isOnline(obj) {
      let UserId = obj.par[0]._id;
      console.log(obj);
      this.$socket.emit("isonline", UserId);
      return "";
    },
    addMessage(item) {
      if (item === undefined || item === null) {
        return;
      }
      let arr = [];
      arr.push(item);
    }
  }
};
</script>

<style>
</style>
