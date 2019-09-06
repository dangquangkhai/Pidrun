<template>
  <div class="layout" style="font-family: initial;">
    <!-- Start of Sign Up -->
    <transition name="fade">
      <div class="main order-md-2" v-if="!regSuccess" id="regFrm">
        <div class="start">
          <div class="container">
            <div class="col-md-12">
              <div class="content">
                <h1>Tạo tài khoản Pidrun</h1>
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
                <p>Đăng Ký:</p>
                <form class="signup" v-on:submit.prevent="register()">
                  <div class="form-group">
                    <input
                      type="email"
                      id="inputEmail"
                      class="form-control"
                      placeholder="Email"
                      required
                      v-model="form.email"
                      name="emailuser"
                      data-vv-as="Email"
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
                  <div class="form-parent">
                    <div class="form-group">
                      <input
                        type="text"
                        id="inputLastname"
                        name="inputLastname"
                        class="form-control"
                        placeholder="Họ"
                        v-model="form.lastname"
                        data-vv-as="last name"
                        v-validate="'alpha'"
                      />
                      <button class="btn icon">
                        <i class="material-icons">person_outline</i>
                      </button>
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        id="inputFirstname"
                        name="inputFirstname"
                        class="form-control"
                        placeholder="Tên"
                        v-model="form.firstname"
                        data-vv-as="first name"
                        v-validate="'alpha'"
                      />
                      <button class="btn icon">
                        <i class="material-icons">person_outline</i>
                      </button>
                    </div>
                  </div>
                  <div class="form-parent">
                    <div class="form-group">
                      <span
                        style="color:red;"
                        v-if="errors.has('inputLastname')"
                      >{{ errors.first('inputLastname') }}</span>
                    </div>
                    <div class="form-group">
                      <span
                        style="color:red;"
                        v-if="errors.has('inputFirstname')"
                      >{{ errors.first('inputFirstname') }}</span>
                    </div>
                  </div>
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
                    <p style="color: red;">{{reg_error}}</p>
                  </div>
                  <button
                    type="button"
                    class="btn button"
                    v-if="!disbleReg"
                    v-on:click="register()"
                  >Đăng ký</button>
                  <button type="button" class="btn button" v-if="disbleReg" disabled>Đăng ký</button>
                  <div class="callout">
                    <span>
                      Đã có tài khoản?
                      <a href="#" v-on:click="login()">Đăng nhập</a>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- End of Sign Up -->
    <!-- Start of register account success -->
    <transition name="fade">
      <div class="main order-md-2" v-if="regSuccess" id="regChk">
        <div class="start">
          <div class="container">
            <div class="col-md-12">
              <div class="content">
                <h1>Tạo tài khoản thành công <i class="fa fa-check-circle" aria-hidden="true" style="color:green"></i></h1>
                <h4>Kiểm tra hộp thư để kích hoạt tài khoản, nếu không có xin hãy check hộp thư spam</h4>
                <h4>Nhấn vào <a href="#" v-on:click="login()" style="font-weight:1000">đây</a> để đăng nhập</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- End of register account success -->
    <!-- Start of Sidebar -->
    <div class="aside order-md-1">
      <div class="container">
        <div class="col-md-12">
          <div class="preference">
            <h2>Chào Mừng Trở Lại!</h2>
            <p>Để giữ liên lạc với bạn bè của bạn hãy đăng nhập.</p>
            <a href="#" v-on:click="login()" class="btn button">Đăng Nhập</a>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Sidebar -->
  </div>
  <!-- Layout -->
</template>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
<script>
import login_router from "../../Login/router";
import home_router from "../../Home/router";
import { TokenService } from "../../../services/storage.service";

import VeeValidate from "vee-validate";

export default {
  name: "register",
  data() {
    return {
      form: {
        email: null,
        password: null,
        repass: null,
        firstname: null,
        lastname: null
      },
      LOGIN_CONTROLLER: this.$api.getApi() + "/account",
      reg_error: null,
      disbleReg: false,
      regSuccess: false,
    };
  },
  mounted() {},
  methods: {
    login: function() {
      login_router.push({ name: "index" });
      location.reload();
    },
    register: function() {
      this.regSuccess = true;
      // this.$validator
      //   .validateAll()
      //   .then(res => {
      //     if (res) {
      //       this.disbleReg = true;
      //       this.$http
      //         .post(this.LOGIN_CONTROLLER + "/register", { user: this.form })
      //         .then(val => {
      //           if (val.data.success) {
      //             this.reg_error = null;
      //             this.regSuccess = true;
      //           } else {
      //             //this.login_error = "Email hoặc mật khẩu không đúng";
      //             this.disbleReg = false;
      //             this.reg_error = val.data.content;
      //           }
      //         })
      //         .catch(err => {
      //           this.reg_error = err;
      //           this.disbleReg - false;
      //         });
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  }
};
</script>

<style>
</style>
