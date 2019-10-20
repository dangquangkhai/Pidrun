<template>
  <div class="layout" style="font-family: auto;">
    <!-- Start of Sign In -->
    <div class="main order-md-1" v-if="state == 'index'">
      <div class="start">
        <div class="container">
          <div class="col-md-12">
            <transition name="fade">
              <div class="content" v-if="!forgetSuccess">
                <h1>Khôi phục tài khoản</h1>
                <p class="reMail">Nhập email bạn đã đăng ký để chúng tôi cóthể gửi mật khẩu về</p>
                <form v-on:submit.prevent="forget()">
                  <div class="form-group">
                    <input
                      type="email"
                      id="inputEmail"
                      class="form-control"
                      placeholder="Email"
                      required
                      v-model="form.email"
                      name="emailuser"
                      data-vv-as="email"
                      v-validate.continutes="'required|email'"
                    />
                    <button class="btn icon">
                      <i class="material-icons">mail_outline</i>
                    </button>
                  </div>
                  <div class="form-group">
                    <span
                      style="color:red;"
                      v-if="errors.has('emailuser')"
                    >{{ errors.first('emailuser') }}</span>
                  </div>
                  <div class="form-group">
                    <p style="color: red;">{{forget_error}}</p>
                  </div>
                  <button
                    type="button"
                    class="btn button"
                    v-if="!disbleforget"
                    v-on:click="forget()"
                  >Gửi</button>
                  <button
                    type="button"
                    class="btn button"
                    v-if="disbleforget"
                    v-on:click="forget()"
                    disabled
                  >Gửi</button>
                  <div class="callout">
                    <span>
                      Đã có tài khoản?
                      <a href="#" v-on:click="loginforget()">Đăng nhập</a>
                    </span>
                  </div>
                </form>
              </div>
            </transition>
            <!-- Start of register account success -->

            <transition name="fade">
              <div class="content" v-if="forgetSuccess">
                <h1>
                  Tạo tài khoản thành công
                  <i
                    class="fa fa-check-circle"
                    aria-hidden="true"
                    style="color:green"
                  ></i>
                </h1>
                <h4>Kiểm tra hộp thư để kích hoạt tài khoản, nếu không có xin hãy check hộp thư spam</h4>
                <h4>
                  Nhấn vào
                  <a v-on:click="loginforget()" style="font-weight:1000">đây</a> để đăng nhập
                </h4>
                <h6>
                  <a
                    v-on:click="forgetSuccess = false"
                    style="font-weight: bold !important; color:blue; cursor: pointer;"
                  >
                    Nhấp vào đây
                    để quay lại
                  </a>
                </h6>
              </div>
            </transition>
            <!-- End of register account success -->
          </div>
        </div>
      </div>
    </div>
    <div class="main order-md-1" v-if="state == 'check'">
      <div class="start" v-if="checkKey == key">
        <div class="container">
          <div class="col-md-12">
            <transition name="fade">
              <div class="content" v-if="!forgetSuccess">
                <h1>Tạo mới mật khẩu</h1>
                <p class="reMail">Đặt lại mật khẩu mới ở đây</p>
                <form v-on:submit.prevent="reset()">
                  <div class="form-group">
                    <input
                      type="password"
                      id="inputPassword"
                      name="inputPassword"
                      class="form-control"
                      placeholder="Mật khẩu"
                      v-model="form.password"
                      data-vv-as="password"
                      v-validate.continutes="'required|min:6'"
                      ref="inputPassword"
                    />
                    <button class="btn icon">
                      <i class="material-icons">lock_outline</i>
                    </button>
                  </div>
                  <div class="form-group">
                    <span
                      style="color:red;"
                      v-if="errors.has('inputPassword')"
                    >{{ errors.first('inputPassword') }}</span>
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      id="inputRePassword"
                      name="inputRePassword"
                      class="form-control"
                      placeholder="Nhập lại mật khẩu"
                      v-model="form.repass"
                      data-vv-as="password confirmation"
                      v-validate="'required|confirmed:inputPassword'"
                    />
                    <button class="btn icon">
                      <i class="material-icons">lock_outline</i>
                    </button>
                  </div>
                  <div class="form-group">
                    <span
                      style="color:red;"
                      v-if="errors.has('inputRePassword')"
                    >{{ errors.first('inputRePassword') }}</span>
                  </div>
                  <div class="form-group">
                    <p style="color: red;">{{forget_error}}</p>
                  </div>
                  <button
                    type="button"
                    class="btn button"
                    v-if="!disbleforget"
                    v-on:click="reset()"
                  >Thay đổi</button>
                  <button
                    type="button"
                    class="btn button"
                    v-if="disbleforget"
                    v-on:click="reset()"
                    disabled
                  >Thay đổi</button>
                </form>
              </div>
            </transition>

            <transition name="fade">
              <div class="content" v-if="forgetSuccess">
                <h1>
                  Thay đổi mật khẩu thành công
                  <i
                    class="fa fa-check-circle"
                    aria-hidden="true"
                    style="color:green"
                  ></i>
                </h1>
                <h4>
                  Nhấn vào
                  <a
                    v-on:click="loginforget()"
                    style="font-weight:1000; cursor: pointer;"
                  >đây</a> để đăng nhập
                </h4>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div class="start" v-else>
        <div class="container">
          <div class="col-md-12">
            <transition name="fade">
              <div class="content">
                <h1>Xin lỗi đường link không hợp lệ!!!</h1>
                <div>
                  <span>
                    <a href="#" v-on:click="loginforget()">
                      Click vào đây để trở về trang đăng
                      nhập
                    </a>
                  </span>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Sign In -->
  </div>
</template>

<script>
import register_router from "../../Register/router";
import home_router from "../../Home/router";
import { TokenService } from "../../../services/storage.service";
import login_router from "../../Login/router";
import axios from "axios";

export default {
  name: "forgetpass",
  data() {
    return {
      form: {
        email: null,
        password: null,
        repass: null
      },
      FORGET_CONTROLLER: this.$api.getApi() + "/account",
      user_info: null,
      forget_error: null,
      disbleforget: false,
      forgetSuccess: false,
      state: null,
      checkKey: null,
      key: null
    };
  },
  mounted() {
    this.checkState(this.$route);
  },
  methods: {
    register: function() {
      register_router.push({
        name: "index"
      });
      location.reload();
    },

    forget: function() {
      //this.disbleforget = true;
      this.$validator
        .validateAll()
        .then(res => {
          if (res) {
            let func = (obj = null) => {
              this.$http
                .post(this.FORGET_CONTROLLER + "/requestforget", {
                  email: this.form.email,
                  info: obj
                })
                .then(val => {
                  if (val.data.success) {
                    this.forgetSuccess = true;
                  }
                });
            };
            $.getJSON("http://extreme-ip-lookup.com/json", data => {
              func(data);
            })
              .done(function() {
                //alert("getJSON request succeeded!");
              })
              .fail(function() {
                //alert("getJSON request failed! ");
                func();
              })
              .always(function() {
                //alert("getJSON request ended!");
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loginforget: function() {
      login_router.push({
        name: "index"
      });
      location.reload();
    },
    checkState(path) {
      console.log(JSON.stringify(path.query));
      if (
        Object.keys(path.query).length === 0 &&
        path.query.constructor === Object
      ) {
        this.state = "index";
      } else if (Object.keys(path.query).length > 0) {
        this.state = "check";
        this.key = path.query.key;
        this.checkkey();
      } else {
        this.state = "error";
      }
    },
    checkkey() {
      this.$http
        .post(this.FORGET_CONTROLLER + "/forgetcheck", {
          key: this.key
        })
        .then(val => {
          if (val.data.success) {
            this.checkKey = this.key;
          }
        });
    },
    reset() {
      this.$validator
        .validateAll()
        .then(res => {
          if (res) {
            this.$http
              .post(this.FORGET_CONTROLLER + "/forgetpass", {
                key: this.key,
                newpass: this.form.password
              })
              .then(val => {
                if (val.data.success) {
                  this.forgetSuccess = true;
                }
              })
              .catch(err => {
                this.forget_error = "Something wrong happen!!";
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style type="text/css">
.reMail {
  font-weight: bold !important;
  color: black;
  text-align: center;
  /* padding: 0 486px;
  margin-bottom: 5px !important; */
}

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
</style>
