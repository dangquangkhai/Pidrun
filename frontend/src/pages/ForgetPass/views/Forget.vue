<template>
  <div class="layout" style="font-family: initial;">
    <!-- Start of Sign In -->
    <div class="main order-md-1">
      <div class="start">
        <div class="container">
          <div class="col-md-12">
            <transition name="fade">
              <div class="content" v-if="!forgetSuccess">
                <h1>Tìm tài khoản của bạn</h1>
                <p class="reMail">Nhập tài khoản email :</p>
                <form>
                  <div class="form-group">
                    <input
                      type="email"
                      id="inputEmail"
                      class="form-control"
                      placeholder="Email"
                      required
                      v-model="form.email"
                    />
                    <button class="btn icon">
                      <i class="material-icons">mail_outline</i>
                    </button>
                  </div>
                  <div class="form-group">
                    <p style="color: red;">{{login_error}}</p>
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
                      Chưa có tài khoản?
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
                  <a href="#" v-on:click="loginforget()" style="font-weight:1000">đây</a> để đăng nhập
                </h4>
                <h6>
                  <a href="#" style="font-weight: bold !important; color:blue">Nhấp vào đây để gửi lại</a>
                </h6>
              </div>
            </transition>
            <!-- End of register account success -->
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
      disbleforget: false,
      forgetSuccess: false
    };
  },
  mounted() {},
  methods: {
    register: function() {
      register_router.push({ name: "index" });
      location.reload();
    },

    forget: function() {
      this.forgetSuccess = true;
    },
    loginforget: function() {
      login_router.push({ name: "index" });
      location.reload();
    }
  }
};
</script>

<style type="text/css">
.reMail {
  font-weight: bold !important;
  color: black;
  text-align: left;
  padding: 0 486px;
  margin-bottom: 5px !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
