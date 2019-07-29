<template>
  <!-- Start of Create Chat -->
  <div class="modal fade" id="startnewchat" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="requests">
        <div class="title">
          <h1>Start new chat</h1>
          <button type="button" class="btn" v-on:click="disableChat()" aria-label="Close">
            <i class="material-icons">close</i>
          </button>
        </div>
        <div class="content">
          <form>
            <div class="form-group">
              <label for="participant">Recipient:</label>
              <input
                type="text"
                class="form-control"
                id="participant"
                placeholder="Add recipient..."
                required
              />
              <div class="user" id="recipient">
                <img class="avatar-sm" src="swipe/img/avatars/avatar-female-5.jpg" alt="avatar" />
                <h5>Keith Morris</h5>
                <button class="btn">
                  <i class="material-icons">close</i>
                </button>
              </div>
            </div>
            <div class="form-group">
              <label for="topic">Topic:</label>
              <input
                type="text"
                class="form-control"
                id="topic"
                placeholder="What's the topic?"
                required
              />
            </div>
            <div class="form-group">
              <label for="message">Message:</label>
              <textarea
                class="text-control"
                id="message"
                placeholder="Send your welcome message..."
              >Hmm, are you friendly?</textarea>
            </div>
            <button class="btn button w-100">Start New Chat</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Create Chat -->
</template>

<script>
export default {
  name: "Createchat",
  props: ["showchat"],
  data() {
    return {};
  },
  watch: {
    showchat: function(val) {
      if (val) {
        this.enableChat();
      }
    }
  },
  methods: {
    enableChat: function() {
      $(document).ready(function() {
        $("#startnewchat").modal("show");
      });
    },
    disableChat: function() {
      $(document).ready(function() {
        $("#startnewchat").modal("hide");
      });
      this.$emit('closechat', false);
    }
  }
};
</script>

<style>
.modal-backdrop{
  z-index: unset;
}
</style>
