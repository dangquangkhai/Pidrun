<template>
  <div class="layout" style="font-family: initial;">
    <!-- Start of Sign In -->
    <div class="main order-md-1">
      <div class="start">
        <div class="container">
          <div class="col-md-12">
            <div class="content">
              <h1>Đăng nhập vào Pidrun App</h1>
              <div class="third-party">
                <button class="btn item bg-blue">
                  <i class="material-icons">pages</i>
                </button>
                <button class="btn item bg-teal">
                  <i class="material-icons">party_mode</i>
                </button>
                <button class="btn item bg-purple">
                  <i class="material-icons">whatshot</i>
                </button>
              </div>
              <p>Đăng nhập bằng email:</p>
              <form v-on:submit.prevent="login()">
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
                  <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Mật khẩu"
                    required
                    v-model="form.pass"
                    name="inputPassword"
                    data-vv-as="password"
                    v-validate="'required'"
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
                  <p style="color: red;">{{login_error}}</p>
                <div class="forget">
                  <a href="#" v-on:click="forgetPass()" >Quên mật khẩu? Nhấp vào đây</a>
                </div>
                <button
                  type="button"
                  class="btn button"
                  v-if="!disbleLogin"
                  v-on:click="login()"
                >Đăng nhập</button>
                <button
                  type="button"
                  class="btn button"
                  v-if="disbleLogin"
                  v-on:click="login()"
                  disabled
                >Đăng nhập</button>

                <div class="callout">
                  <span>
                    Chưa có tài khoản?
                    <a href="#" v-on:click="register()">Đăng ký</a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Sign In -->
    <!-- Start of Sidebar -->
    <div class="aside order-md-2">
      <div class="container">
        <div class="col-md-12">
          <div class="preference">
            <h2>Xin chào, bạn!</h2>
            <p>Kết nói bạn bè thỏa sức trò chuyện.</p>
            <a href="#" v-on:click="register()" class="btn button">Đăng ký</a>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Sidebar -->
  </div>
</template>

<script>
import register_router from "../../Register/router";
import home_router from "../../Home/router";
import { TokenService } from "../../../services/storage.service";
import forget_router from "../../ForgetPass/router";

import VeeValidate from "vee-validate";

export default {
  name: "login",
  data() {
    return {
      form: {
        email: null,
        pass: null
      },
      LOGIN_CONTROLLER: this.$api.getApi() + "/account",
      user_info: null,
      login_error: null,
      disbleLogin: false
    };
  },
  mounted() {},
  methods: {
    register: function() {
      register_router.push({ name: "index" });
      location.reload();
    },
    login: function() {
      this.disbleLogin = true;
      this.$validator
        .validateAll()
        .then(res => {
          if (res) {
            this.$http
              .post(this.LOGIN_CONTROLLER + "/login", { user: this.form })
              .then(val => {
                if (val.data.success) {
                  this.login_error = null;
                  this.user_info = val.data.content.data.user;
                  TokenService.removeToken();
                  TokenService.removeRefreshToken();
                  TokenService.saveToken(val.data.content.data.token);
                  //TokenService.saveRefreshToken(response.data.refresh_token);
                  home_router.push({ name: "home" });
                  location.reload();
                } else {
                  this.login_error = "Email hoặc mật khẩu không đúng";
                  this.disbleLogin = false;
                }
              })
              .catch(err => {});
          }

        })
        .catch(err => {
          console.log(err);
        });
    },
    forgetPass: function(){
        forget_router.push({name: "index"});
        location.reload();
    }
  }
};
</script>

<style>
</style>
