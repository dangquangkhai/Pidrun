
<template>
  <div class="layout">
    <Navigation :path="selectPath" v-on:getmenu="getpath"></Navigation>
    <Sidebar
      v-if="selectPath !== null"
      :name="selectPath"
      :keysidebar="SidebarKey"
      v-on:resetkeybar="SidebarKey = 0"
    ></Sidebar>
    <!-- <Sidebar></Sidebar>
    <Addfriend></Addfriend>-->
    <Chat></Chat>
  </div>
</template>

<script>

// @ is an alias to /src
import Navigation from "@/components/navigation.vue";
import Sidebar from "@/components/sidebar.vue";
// import Addfriend from "@/components/addfriend.vue";
import Chat from "@/components/chat.vue";
import Axios from "axios";
let api = require('../../../assets/js/host');

var CONTROLLER = api.getApi();

let LibUtils = require("../../../assets/js/LibUtils");

export default {
  name: "home",
  components: {
    Navigation,
    Sidebar,
    Chat
  },
  data() {
    return {
      selectPath: null,
      SidebarKey: 0
    };
  },
  mounted() {
    this.getpath(this.$route.hash);
    console.log(CONTROLLER);
    console.log(this.$api);
    if (LibUtils.LibUtils.isEmpty(CONTROLLER)) {
      console.log("Rỗng");
    }
    Axios.get(this.$api.getApi() + "/api").then(res => {
      if (!res.data.success) {
        console.log("error");
      }
    });
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
    }
  }
};
</script>
