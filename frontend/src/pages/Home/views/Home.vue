
<template>
  <div class="layout">
    <Navigation :path="selectPath" v-on:getmenu="getpath" v-on:click="requestSetting = null;" :usrdata="userinfo"></Navigation>
    <Sidebar
      v-if="selectPath !== null"
      :name="selectPath"
      :keysidebar="SidebarKey"
      :usrinfo="userinfo"
      v-on:resetkeybar="SidebarKey = 0"
      v-on:getcon="getcon"
      v-on:opensetting="requestSetting = $event"
    ></Sidebar>
    <!-- <Sidebar></Sidebar>
    <Addfriend></Addfriend>-->
    <Chat
      :coninfo="conInfo"
      :usrinfo="userinfo"
      v-on:sendcall="requestcalling"
      v-if="selectPath !== 'settings'"
    ></Chat>
    <FormSetting v-if="selectPath === 'settings'" :name="requestSetting" :usrinfo="userinfo" v-on:reupdateinfo="getUsrInfo"></FormSetting>
    <Call :showcall="requestCall"></Call>
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from "@/components/navigation.vue";
import Sidebar from "@/components/sidebar.vue";
// import Addfriend from "@/components/addfriend.vue";
import Chat from "@/components/chat.vue";
import Call from "@/components/call.vue";
import FormSetting from "@/components/formsetting.vue";
import Axios from "axios";
let api = require("../../../assets/js/host");

var CONTROLLER = api.getApi();

let LibUtils = require("../../../assets/js/LibUtils");

export default {
  name: "home",
  components: {
    Navigation,
    Sidebar,
    Chat,
    Call,
    FormSetting
  },
  data() {
    return {
      selectPath: null,
      SidebarKey: 0,
      USR_CONTROLLER: this.$api.getApi() + "/users",
      userinfo: {},
      conInfo: null,
      stremInfo: null,
      callStatus: null,
      requestCall: false,
      requestSetting: null
    };
  },
  mounted() {
    this.getpath(this.$route.hash);
    if (LibUtils.LibUtils.isEmpty(CONTROLLER)) {
      // console.log("Rỗng");
    }
    //this.getUsrInfo();
  },
  sockets: {
    connect() {
      console.log("connected to chat server");
      this.getUsrInfo();
    },
    count(val) {
      this.count = val.count;
    },
    message(data) {},
    checkonline(data) {
      console.log(data);
    }
  },
  methods: {
    getpath: function(path) {
      // var path = this.$route.hash;
      if (!path.includes("#")) {
        path = "#" + path;
      }
      switch (path) {
        case "#members":
          this.selectPath = "members";
          this.SidebarUpdate();
          break;
        case "#notifications":
          this.selectPath = "notifications";
          this.SidebarUpdate();
          break;
        case "#darkmode":
          this.selectPath = "darkmode";
          this.SidebarUpdate();
          break;
        case "#settings":
          this.selectPath = "settings";
          this.resetval();
          this.SidebarUpdate();
          break;
        default:
          this.selectPath = "discussions";
          this.SidebarUpdate();
          break;
      }

    },
    SidebarUpdate: function() {
      this.SidebarKey += 1;
    },
    getUsrInfo: function() {
      console.log(true);
      this.$http
        .post(this.USR_CONTROLLER + "/userinfo")
        .then(res => {
          if (res.data.success) {
            this.userinfo = res.data.content;
            // this.getUsrImg();
            this.$socket.emit("sendUsrInfo", this.userinfo);
          }
        })
        .catch();
    },
    getcon(obj) {
      this.conInfo = obj;
    },
    requestcalling(obj) {
      console.log(obj);
      this.requestCall = obj;
    },
    requestsetting(name) {},
    resetval(){
     this.requestSetting = null;
    },
    resetChat(){
      this.userinfo = null;
      this.conInfo = null;
    }
  }
};
</script>
