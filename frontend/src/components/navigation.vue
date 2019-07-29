<template>
  <!-- Start of Navigation -->
  <div class="navigation">
    <div class="container">
      <div class="inside">
        <div class="nav nav-tab menu">
          <button class="btn">
            <img class="avatar-xl" src="swipe/img/avatars/avatar-male-1.jpg" alt="avatar" />
          </button>
          <!-- <a href="#members" >
            <i class="material-icons">account_circle</i>
          </a>
          <a href="#discussions"  class="active">
            <i class="material-icons active">chat_bubble_outline</i>
          </a>
          <a href="#notifications"  class="f-grow1">
            <i class="material-icons">notifications_none</i>
          </a>
          <button class="btn mode">
            <i class="material-icons">brightness_2</i>
          </button>
          <a href="#settings" >
            <i class="material-icons">settings</i>
          </a>
          <button class="btn power" onclick="visitPage();">
            <i class="material-icons">power_settings_new</i>
          </button>-->
          <Navbutton
            v-for="(item, index) in menu"
            :key="index + '-' +item.name "
            :name="item.name"
            :icon="item.icon"
            :type="item.type"
            :extend="item.extend"
            :ref="'Navbutton-'+item.name"
            v-on:getname="selmenu"
          ></Navbutton>
          <button class="btn power" onclick="visitPage();">
            <i class="material-icons">power_settings_new</i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- End of Navigation -->
</template>


<script>
import Navbutton from "@/components/navbutton.vue";

export default {
  name: "Navigation",
  props: ["path"],
  components: {
    Navbutton
  },
  mounted() {},
  watch: {
    path: function(val) {}
  },
  data() {
    return {
      menu: [
        {
          name: "members",
          icon: "account_circle",
          type: "a",
          extend: ""
        },
        {
          name: "discussions",
          icon: "chat_bubble_outline",
          type: "a",
          extend: ""
        },
        {
          name: "notifications",
          icon: "notifications_none",
          type: "a",
          extend: "f-grow1"
        },
        {
          name: "darkmode",
          icon: "brightness_2",
          type: "button",
          extend: ""
        },
        {
          name: "settings",
          icon: "settings",
          type: "a",
          extend: ""
        }
      ]
    };
  },
  mounted() {
    if (this.path !== null) {
      name = "Navbutton-" + this.path;
      this.$refs[name][0].getName();
    }
  },
  methods: {
    selmenu: function(name) {
      this.$emit("getmenu", name);
    }
  }
};
</script>

<style>
</style>
