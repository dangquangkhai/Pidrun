<template>
  <div :class="extend + ' changeSize'">
    <a
      v-if="type == 'a'"
      :id="name"
      href="javascript:void(0)"
      v-on:click="getName()"
      class="f-grow1 remove-active"
    >
      <i class="material-icons">{{icon}}</i>
    </a>
    <button
      v-if="type == 'button'"
      class="btn mode remove-active"
      :id="name"
      :href="name"
      v-on:click="getName()"
    >
      <i class="material-icons">{{icon}}</i>
    </button>
  </div>
</template>

<script>
export default {
  name: "Navbutton",
  props: ["name", "icon", "type", "extend"],
  watch: {
    name: function(val) {
      if (val !== null) {
        console.log(val);
        this.getName();
      }
    }
  },
  mounted() {},
  methods: {
    activeClass: function() {
      var _this = this;
      $(document).ready(function() {
        $(_this.type + ".remove-active > i.material-icons").removeClass(
          "active"
        );
        $(_this.type + "#" + _this.name + " > i.material-icons").addClass(
          "active"
        );
      });
    },
    getName: function() {
      this.activeClass();
      this.$emit("getname", this.name);
    }
  }
};
</script>

<style>
</style>
