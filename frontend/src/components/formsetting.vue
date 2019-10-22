<template>
  <!-- End of Create Chat -->
  <div class="main order-md-2" style="overflow-y: auto;">
    <transition name="fade">
      <div class="start" v-if="name == 'profile'">
        <div class="container">
          <div class="col-md-12">
            <div class="content">
              <h1>Thông tin hồ sơ</h1>
              <div class="third-party">
                <div>
                  <img
                    id="image"
                    :src="CON_CONTROLLER + '/getimage/' + usrinfo.image"
                    style="width:300px; height: 300px;"
                  />
                </div>
              </div>
              <div class="third-party">
                <md-button class="md-raised md-primary" v-on:click="$refs.file.click()">Tải ảnh</md-button>
                <input
                  type="file"
                  ref="file"
                  style="display: none"
                  accept="image/*"
                  v-on:change="uploadImg"
                />
                <md-button class="md-raised" v-if="!disbleReg" v-on:click="updateImg()">Cập nhật</md-button>
              </div>
              <p>Thông tin hồ sơ</p>
              <form class="signup" v-on:submit.prevent="updateInfo()">
                <div class="form-group">
                  <md-field>
                    <md-icon>email</md-icon>
                    <label>Email</label>
                    <md-input
                      v-model="form.email"
                      data-vv-as="Email"
                      name="emailuser"
                      v-validate.continutes="'required|email'"
                    ></md-input>
                  </md-field>
                </div>
                <div class="form-group">
                  <span
                    style="color:red;"
                    v-if="errors.has('emailuser')"
                  >{{ errors.first('emailuser') }}</span>
                </div>
                <div class="row">
                  <div class="form-group col-6">
                    <md-field>
                      <md-icon>person</md-icon>
                      <label>Họ</label>
                      <md-input
                        v-model="form.lastname"
                        data-vv-as="Họ"
                        name="inputLastname"
                        v-validate="'required'"
                      ></md-input>
                    </md-field>
                  </div>
                  <div class="form-group col-6">
                    <md-field>
                      <md-icon>person</md-icon>
                      <label>Tên</label>
                      <md-input
                        v-model="form.firstname"
                        data-vv-as="Tên"
                        name="inputFirstname"
                        v-validate="'required'"
                      ></md-input>
                    </md-field>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-6">
                    <span
                      style="color:red;"
                      v-if="errors.has('inputLastname')"
                    >{{ errors.first('inputLastname') }}</span>
                  </div>
                  <div class="form-group col-6">
                    <span
                      style="color:red;"
                      v-if="errors.has('inputFirstname')"
                    >{{ errors.first('inputFirstname') }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <md-radio
                    v-model="form.gender"
                    :value="true"
                    style="margin-top:0px; margin-bottom:0px;"
                  >Nam</md-radio>
                  <md-radio
                    v-model="form.gender"
                    :value="false"
                    style="margin-top:0px; margin-bottom:0px;"
                  >Nữ</md-radio>
                </div>
                <div class="form-group">
                  <md-datepicker v-model="form.birthday" md-immediately />
                </div>
                <div class="form-group">
                  <p style="color: red;">{{reg_error}}</p>
                </div>
                <md-button
                  class="btn md-raised md-primary"
                  v-if="!disbleReg"
                  v-on:click="updateInfo()"
                >Cập nhật thông tin</md-button>
                <md-button class="md-raised" v-if="disbleReg" disabled>Cập nhật thông tin</md-button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="start" v-if="name == 'updatePass'">
        <div class="container">
          <div class="col-md-12">
            <div class="content">
              <h3>Thay đổi mật khẩu</h3>
              <form class="signup" v-on:submit.prevent="updatePassword()">
                <div class="form-group">
                      <md-field>
                          <md-icon>lock</md-icon>
                          <label>Mật khẩu cũ</label>
                          <md-input id="inputOldPassword" name="inputOldPassword" v-model="form.oldpass" data-vv-as="mật khẩu cũ" v-validate.continutes="'required'" type="password"></md-input>
                      </md-field>
                </div>
                <div class="form-group">
                    <span
                      style="color:red;"
                      v-if="errors.has('inputOldPassword')"
                    >{{ errors.first('inputOldPassword') }}</span>
                </div>
                <div class="form-group">
                      <md-field>
                          <md-icon>lock</md-icon>
                          <label>Mật khẩu</label>
                          <md-input id="inputPassword" name="inputPassword" v-model="form.password" data-vv-as="mật khẩu" v-validate.continutes="'required|min:6'" ref="inputPassword" type="password"></md-input>
                      </md-field>
                </div>
                <div class="form-group">
                    <span
                      style="color:red;"
                      v-if="errors.has('inputPassword')"
                    >{{ errors.first('inputPassword') }}</span>
                </div>
                <div class="form-group">
                      <md-field>
                          <md-icon>lock</md-icon>
                          <label>Nhập lại mật khẩu</label>
                          <md-input id="inputRePassword" name="inputRePassword"  v-model="form.repass" data-vv-as="Nhập lại mật khẩu" v-validate="'required|confirmed:inputPassword'" type="password"></md-input>
                      </md-field>                    
                </div>
                <div class="form-group">
                    <span
                      style="color:red;"
                      v-if="errors.has('inputRePassword')"
                    >{{ errors.first('inputRePassword') }}</span>
                </div>               
                <div class="form-group">
                  <p style="color: red;">{{updatePassErr}}</p>
                </div>
                <md-button
                  class="btn md-raised md-primary"
                  v-if="!disbleReg"
                  v-on:click="updatePassword()"
                >Cập nhật mật khẩu</md-button>
                <md-button class="md-raised" v-if="disbleReg" disabled>Cập nhật mật khẩu</md-button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import moment from "moment";
import {LibUtils} from "../assets/js/LibUtils";
export default {
  name: "FormSetting",
  props: ["name", "usrinfo"],
  components: {},
  data() {
    return {
      CON_CONTROLLER: this.$api.getApi() + "/conversation",
      LOGIN_CONTROLLER: this.$api.getApi() + "/account",
      USR_CONTROLLER: this.$api.getApi() + "/users",
      form: {
        email: null,
        oldpass:null,
        password: null,
        repass: null,
        firstname: null,
        lastname: null,
        gender: true,
        birthday: null
      },
      reg_error: null,
      disbleReg: false,
      regSuccess: false,
      updatePassErr:null
    };
  },
  watch: {
    name(val) {
      switch (val) {
        case "profile":
          this.setValFrm();
          this.CropperImg();
          break;

        default:
          break;
      }
    }
  },
  sockets: {},
  methods: {
    login: function() {
      login_router.push({
        name: "index"
      });
      location.reload();
    },
    register: function() {
      //this.regSuccess = true;
      this.$validator
        .validateAll()
        .then(res => {
          if (res) {
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    CropperImg() {
      $(document).ready(function() {
        var $image = $("#image");
        $image.cropper({
          aspectRatio: 16 / 9,
          crop: function(event) {}
        });
      });
    },
    uploadImg() {
      let files = this.$refs.file.files;
      var file;
      let uploadedImageURL;
      let URL = window.URL || window.webkitURL;
      var image = document.getElementById("image");
      file = files[0];
      if (/^image\/\w+/.test(file.type)) {
        let uploadedImageType = file.type;
        let uploadedImageName = file.name;

        if (uploadedImageURL) {
          URL.revokeObjectURL(uploadedImageURL);
        }

        image.src = uploadedImageURL = URL.createObjectURL(file);
        $("#image").cropper("destroy");
        this.CropperImg();
        this.$refs.file.files = null;
      } else {
        window.alert("Please choose an image file.");
      }
    },
    updateImg() {
      let _this = this;
      $(document).ready(function() {
        $("#image")
          .cropper("getCroppedCanvas")
          .toBlob(data => {
            const config = {
              headers: { "Content-Type": "multipart/form-data" }
            };
            var formData = new FormData();
            formData.append("image", data);
            _this.$http
              .post(_this.USR_CONTROLLER + "/uploadimage", formData, config)
              .then(val => {
                if (val.data.success) {
                  LibUtils.callToast("Thành công", "Cập nhật ảnh người dùng thành công");
                  this.$emit("reupdateinfo");
                }
                else{
                  LibUtils.callToast("Lỗi", "Cập nhật ảnh nguòi dùng không thành công", "error");
                }
              });
          });
      });
    },
    setValFrm() {
      this.form.email = this.usrinfo.email;
      this.form.firstname = this.usrinfo.firstname;
      this.form.lastname = this.usrinfo.lastname;
      this.form.gender =
        this.usrinfo.gender !== undefined && this.usrinfo.gender !== null
          ? this.usrinfo.gender
          : true;

      this.form.birthday =
        this.usrinfo.birthday !== undefined && this.usrinfo.birthday !== null
          ? moment(this.usrinfo.birthday)
              .utc()
              .format("DD/MM/YYYY")
          : new Date();
      this.$material.locale.dateFormat = "dd/MM/yyyy";
      this.$material.locale.days = [
        "Chủ Nhật",
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7"
      ];
      this.$material.locale.shortDays = [
        "CN",
        "Th.2",
        "Th.3",
        "Th.4",
        "Th.5",
        "Th.6",
        "Th.7"
      ];
      this.$material.locale.shorterDays = [
        "C",
        "T2",
        "T3",
        "T4",
        "T5",
        "T6",
        "T7"
      ];
      this.$material.locale.months = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12"
      ];
      this.$material.locale.shortMonths = [
        "TH.1",
        "TH.2",
        "TH.3",
        "TH.4",
        "TH.5",
        "TH.6",
        "TH.7",
        "TH.8",
        "TH.9",
        "TH.10",
        "TH.11",
        "TH.12"
      ];
      this.$material.locale.shorterMonths = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ];
    },
    updateInfo() {
      this.$validator
        .validateAll()
        .then(res => {
          if (res) {
            let form = {
              email: this.form.email,
              firstname: this.form.firstname,
              lastname: this.form.lastname,
              gender: this.form.gender,
              birthday: moment(this.form.birthday, "DD/MM/YYYY")
                .add(1, "days")
                .toDate()
            };
            this.$http
              .post(this.USR_CONTROLLER + "/updateinfo", { userinfo: form })
              .then(val => {
                if (val.data.success) {
                  LibUtils.callToast("Thành công", "Cập nhật thông tin người dùng thành công");
                  this.$emit("reupdateinfo");
                }
                else{
                  LibUtils.callToast("Lỗi", "Cập nhật  thông tin người dùng không thành công", "error");
                }                
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updatePassword()
    {
      this.$validator
        .validateAll()
        .then(res => {
          if (res) {
            this.updatePassErr = null;
            let form = {
              oldpass : this.form.oldpass,
              pass: this.form.password,
              repass: this.form.repass
            };
            this.$http.post(this.USR_CONTROLLER + "/updatepass", {contentPassword: form}).then(val => {
              if (val.data.success) {
                LibUtils.callToast("Thành công", "Cập nhật mật khẩu thành công");
              }
              else{
                LibUtils.callToast("Không thành công", "Cập nhật mật khẩu không thành công", "error");
                this.updatePassErr = "Mật khẩu cũ không đúng !!!";
              }
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
    .fade-leave-to
    /* .fade-leave-active below version 2.1.8 */
    
 {
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

.img-container {
  /* Never limit the container height here */
  max-width: 100%;
}

.img-container img {
  /* This is important */
  width: 100%;
}


</style>