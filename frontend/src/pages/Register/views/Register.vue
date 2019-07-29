<template>
  <div class="layout">
    <!-- Start of Sign Up -->
    <div class="main order-md-2">
      <div class="start">
        <div class="container">
          <div class="col-md-12">
            <div class="content">
              <h1>Create Account</h1>
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
              <p>or use your email for registration:</p>
              <form class="signup">
                <div class="form-parent">
                  <div class="form-group">
                    <input
                      type="text"
                      id="inputName"
                      class="form-control"
                      placeholder="Username"
                      required
                    />
                    <button class="btn icon">
                      <i class="material-icons">person_outline</i>
                    </button>
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      id="inputEmail"
                      class="form-control"
                      placeholder="Email Address"
                      required
                    />
                    <button class="btn icon">
                      <i class="material-icons">mail_outline</i>
                    </button>
                  </div>
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    required
                  />
                  <button class="btn icon">
                    <i class="material-icons">lock_outline</i>
                  </button>
                </div>
                <button type="submit" class="btn button" formaction="index-2.html">Sign Up</button>
                <div class="callout">
                  <span>
                    Already a member?
                    <a href="sign-in.html">Sign In</a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Sign Up -->
    <!-- Start of Sidebar -->
    <div class="aside order-md-1">
      <div class="container">
        <div class="col-md-12">
          <div class="preference">
            <h2>Welcome Back!</h2>
            <p>To keep connected with your friends please login with your personal info.</p>
            <a href="sign-in.html" class="btn button">Sign In</a>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Sidebar -->
  </div>
  <!-- Layout -->
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      form: {
        user: null,
        pass: null
      }
    };
  },
  mounted() {}
};
</script>

<style>
</style>
