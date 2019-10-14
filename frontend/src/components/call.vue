<template>
  <!-- Modal -->
  <div
    class="modal fade bd-example-modal-lg custom-moddal"
    id="myModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
  >
    <div class="custom-modal-width" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title custom-modal-title" id="myModalLabel">Gọi điện</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- <video
            controls
            id="video1"
            style="width: 100%; height: auto; margin:0 auto; frameborder:0;"
          >
            <source
              src="https://archive.org/download/WebmVp8Vorbis/webmvp8_512kb.mp4"
              type="video/mp4"
            />Your browser doesn't support HTML5 video tag.
          </video>-->
          <video id="localVideo" autoplay playsinline></video>
          <video id="remoteVideo" autoplay playsinline></video>
          <button id="startButton">Start</button>
          <button id="callButton">Call</button>
          <button id="hangupButton">Hang Up</button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Call",
  props: ["coninfo", "usrinfo", "showcall"],
  data() {
    return {
      CON_CONTROLLER: this.$api.getApi() + "/conversation"
    };
  },
  watch: {
    showcall(val) {
      if (val == true) {
        this.showCall();
      }
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
  },
  methods: {
    showCall() {
      let _this = this;
      $(document).ready(function() {
        $("#myModal").modal("show");
        _this.handleCall();
      });
    },
    handleCall() {
      const constraints = (window.constraints = {
        audio: true,
        video: true
      });
      try {
        const stream = navigator.mediaDevices.getUserMedia(constraints);
        console.log(stream);
        stream.then(val => {
          this.handleSuccess(val);
        });
        //e.target.disabled = true;
      } catch (e) {
        this.handleError(e);
      }
    },
    handleSuccess(stream) {
      const video = document.getElementById("localVideo");
      //$("#localVideo")[0].load;
      const videoTracks = stream.getVideoTracks();
      console.log("Got stream with constraints:", constraints);
      console.log(`Using video device: ${videoTracks[0].label}`);
      window.stream = stream; // make variable available to browser console
      console.log(stream);
      video.srcObject = stream;
      this.$socket.emit("requestcall", stream);
      //let localPeerConnection = new RTCPeerConnection(servers);
    },
    handleError(error) {
      if (error.name === "ConstraintNotSatisfiedError") {
        let v = constraints.video;
        console.log(
          `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
        );
      } else if (error.name === "PermissionDeniedError") {
        console.log(
          "Permissions have not been granted to use your camera and " +
            "microphone, you need to allow the page access to your devices in " +
            "order for the demo to work."
        );
      }
      console.log(`getUserMedia error: ${error.name}`, error);
    }
  }
};
</script>

<style>
div.custom-moddal {
  background-color: rgba(0, 0, 0, 0.3);
}

div.custom-modal-width {
  max-width: 1004px;
  margin: auto;
}

/* @media (min-width: 576px) {
  .modal-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
  }
} */

/* .custom-modal-title {
  margin: 0;
  line-height: 1.42857143;
} */
</style>
