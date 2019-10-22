<template>
  <!-- End of Create Chat -->
  <div class="main">
    <div class="tab-content" id="nav-tabContent">
      <!-- Start of Babble -->
      <div
        class="babble tab-pane fade"
        id="list-chat"
        role="tabpanel"
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
                  <button
                    v-on:click="SendCall('video')"
                    class="btn connect d-md-block d-none"
                    name="1"
                  >
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
                      <button class="dropdown-item connect" name="1" v-on:click="SendCall('video')">
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
                <div class="date" style="padding-bottom:unset;" v-if="isStop">
                  <div class="lds-ring" style="margin:auto">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>

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
                          <p style="word-wrap: break-word;">{{subItem.mess.message}}</p>
                        </div>
                      </div>
                      <span>{{generateTime(subItem, subIndex)}}</span>
                    </div>
                  </div>
                </div>
                <transition name="fade">
                  <div class="message" v-if="status">
                    <img
                      v-if="coninfo.conversation.conType == 'PrivateChat' && listTyping.length > 0"
                      class="avatar-md"
                      :src="CON_CONTROLLER + '/getimage/' + listTyping[0].image"
                      data-toggle="tooltip"
                      data-placement="top"
                      title
                      :alt="'avatar' + listTyping[0].firstname"
                      :data-original-title="listTyping[0].firstname"
                    />
                    <div class="text-main">
                      <div class="text-group">
                        <div class="text typing">
                          <div class="wave">
                            <span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>

                <!-- <div class="message" v-show="status">
                  <img
                    class="avatar-md"
                    src="swipe/img/avatars/avatar-female-5.jpg"
                    data-toggle="tooltip"
                    data-placement="top"
                    title
                    alt="avatar"
                    data-original-title="Keith"
                    aria-describedby="tooltip779523"
                  />
                  <div class="text-main">
                    <div class="text-group">
                      <div class="text">
                        <div class="attachment">
                          <button class="btn attach">
                            <i class="material-icons md-18">insert_drive_file</i>
                          </button>
                          <div class="file">
                            <h5>
                              <a href="#">Tenacy Agreement.pdf</a>
                            </h5>
                            <span>24kb Document</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span>11:07 PM</span>
                  </div>
                </div>-->
              </div>
            </div>
          </div>
          <div class="container">
            <div class="col-md-12">
              <div class="bottom">
                <form class="position-relative w-100" v-on:submit.prevent="">
                  <textarea
                    class="form-control"
                    placeholder="Start typing for reply..."
                    rows="1"
                    id="usermessage"
                    v-model="message"
                    v-on:keydown.enter.exact.prevent
                    v-on:keyup.enter.exact="sendMessage()"
                    v-on:keydown.enter.shift.exact="newline"
                  ></textarea>
                  <button class="btn emoticons" id="container1" v-on:click="showEmoji = !showEmoji">
                    <i class="material-icons">insert_emoticon</i>
                  </button>
                  <transition name="fade">
                   <picker v-if="showEmoji" v-on:select="addEmoji" :style="{ position: 'absolute', bottom: '20px', left: '20px', 'margin-bottom': '50px' }" :showPreview='false' @mouseleave="showEmoji = false" />                                     
                  </transition>
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
import { Picker } from 'emoji-mart-vue';
import {LibUtils} from "../assets/js/LibUtils"
export default {
  name: "Chat",
  props: ["coninfo", "usrinfo"],
  components:{
    picker: Picker  
  },
  data() {
    return {
      CON_CONTROLLER: this.$api.getApi() + "/conversation",
      conMess: [],
      message: "",
      listTyping: [],
      status: false,
      isStop: false,
      originalArray: [],
      showEmoji: false
    };
  },
  watch: {
    coninfo: {
      handler(newVal, oldVal) {
        $("#list-chat").addClass("active show");
        if (newVal !== oldVal && newVal !== null) {
          this.originalArray = [];
          this.conMess = [];
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
      if (data !== null && data !== undefined) {
        this.addMessage(data);
      }
    },
    receiveMess(data) {
      if (data !== null && data !== undefined) {
        this.addMessage(data);
      }
    },
    checkTyping(data) {
      if (
        data !== null &&
        data !== undefined &&
        this.coninfo !== null &&
        this.coninfo !== undefined
      ) {
        if (
          JSON.stringify(data.roomid) ==
          JSON.stringify(this.coninfo.conversation._id)
        ) {
          this.status = data.status;
          let find = this.listTyping.findIndex(item => {
            return item._id == data.sender._id;
          });
          console.log(data.sender);
          if (find > -1) {
            this.listTyping.splice(find, 1, data.sender);
          } else {
            this.listTyping.push(data.sender);
          }
          this.$forceUpdate();
          this.gotoBottom();
        }
      }
    }
  },
  methods: {
    getMess(conid, messid = null, showChat = true) {
      this.$http
        .post(this.CON_CONTROLLER + "/getmess", {
          conId: conid,
          messId: messid
        })
        .then(res => {
          let arr = res.data.content;
          if (this.originalArray.length > 0) {
            for (let i = 0; i < arr.length; i++) {
              this.originalArray.push(new Object(arr[i]));
            }
          } else {
            this.originalArray = arr;
          }
          // this gives an object with dates as keys
          const groups = this.originalArray.reduce((groups, item) => {
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
          // if (this.conMess.length == 0) {
          //   this.conMess = groupArrays.reverse();
          // } else {
          //   groupArrays.forEach(item => {
          //     let find = this.conMess.findIndex(subItem => {
          //       return subItem.date == item.date;
          //     });
          //     console.log(find);
          //     if (find > -1) {
          //       this.conMess[find].child.unshift.apply(
          //         this.conMess[find].child,
          //         item.child
          //       );
          //       let obj = new Object(this.conMess[find]);
          //       console.log(obj);
          //       this.conMess.splice(find, 1, obj);
          //     } else {
          //       this.conMess.push(item);
          //     }
          //   });
          //   this.isStop = false;
          // }
          if (showChat) {
            this.showChat();
          } else {
            this.isStop = false;
          }
        });
    },
    showChat() {
      let _this = this;
      $(document).ready(function() {
        $("#list-chat").addClass("active show");
        _this.gotoBottom();
        var timer = null;
        $("#usermessage").keydown(function() {
          let packageOn = new Object({
            par: _this.coninfo.par,
            sender: _this.usrinfo,
            status: true,
            roomid: _this.coninfo.conversation._id
          });
          _this.$socket.emit("onTyping", packageOn);
          clearTimeout(timer);
          timer = setTimeout(stopTyping, 1000);
        });
        function stopTyping() {
          let packageOff = new Object({
            par: _this.coninfo.par,
            sender: _this.usrinfo,
            status: false,
            roomid: _this.coninfo.conversation._id
          });
          _this.$socket.emit("onTyping", packageOff);
        }

        var d = $("div#content");
        $("div#content").on("scroll", function() {
          var scrollTop = $(this).scrollTop();
          if (scrollTop + $(this).innerHeight() >= this.scrollHeight) {
            console.log("End reach");
          } else if (scrollTop <= 0) {
            console.log("Top reached");
            _this.loadMessage();
          } else {
            console.log("");
          }
        });
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
      if (LibUtils.isEmpty(this.message)) {
        return;
      }
      let mess = new Object(this.message);
      let obj = {
        _id: this.coninfo.conversation._id,
        mess: mess,
        par: this.coninfo.par,
        sender: this.usrinfo._id
      };
      this.message = null;
      let packageOff = new Object({
        par: this.coninfo.par,
        sender: this.usrinfo,
        status: false,
        roomid: this.coninfo.conversation._id
      });
      this.$socket.emit("onTyping", packageOff);
      this.$socket.emit("sendmessage", obj);
    },
    isOnline(obj) {
      let UserId = obj.par[0]._id;
      console.log(obj);
      this.$socket.emit("isonline", UserId);
      return "";
    },
    formatMess(arr) {
      const groups = arr.reduce((groups, item) => {
        const date = this.$moment(item.mess.created).format("DD/MM/YYYY"); //.split('T')[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
        return groups;
      }, {});
      // Edit: to add it in the array format instead
      const groupArrays = Object.keys(groups).map(date => {
        return {
          date,
          child: groups[date]
        };
      });
      return groupArrays;
    },
    addMessage(item) {
      if (item === undefined || item === null) {
        return;
      }
      let arr = [];
      arr.push(item);
      arr = this.formatMess(arr);
      arr.forEach(item => {
        let find = this.conMess.findIndex(subItem => {
          return subItem.date == item.date;
        });
        console.log(find);
        if (find > -1) {
          this.conMess[find].child.unshift.apply(
            this.conMess[find].child,
            item.child
          );
          let obj = new Object(this.conMess[find]);
          console.log(obj);
          this.conMess.splice(find, 1, obj);
        } else {
          this.conMess.push(item);
        }
      });
      this.gotoBottom();
    },
    gotoBottom() {
      $(document).ready(function() {
        var d = $("div#content");
        d.scrollTop(d.prop("scrollHeight"));
      });
    },
    SendCall(type) {
      this.$emit("sendcall", true);
    },
    loadMessage() {
      this.isStop = true;
      let nextid = this.originalArray[this.originalArray.length - 1].mess._id;
      this.getMess(this.coninfo.conversation._id, nextid, false);
    },
    addEmoji(emoji){
      this.message += " " + emoji.native;
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 41px;
  height: 41px;
  margin: 6px;
  border: 6px solid #4169e1;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #4169e1 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.main .chat .content .message .text {
    display: inline-block;
    padding: 15px;
    max-width: 450px;
    background: #f5f5f5;
    border-radius: 6px;
    background-color: rgba(0,0,0,0.1);
    color: black;
}
</style>
