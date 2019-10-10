module.exports = {
  // devServer: {
  //   // setting host should not be necessary
  //   // host: '0.0.0.0:8080'
  //   public: "192.168.1.14:8080",
  //   disableHostCheck: true
  // },
  pages: {
    home: {
      // entry for the page
      entry: "./src/pages/Home/main.js",
      // the source template
      template: "public/index.html",
      // output as dist/index.html
      filename: "index.html",
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Index Page",
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ["chunk-vendors", "chunk-common", "home"]
    },
    // // when using the entry-only string format,
    // // template is inferred to be `public/subpage.html`
    // // and falls back to `public/index.html` if not found.
    // // Output filename is inferred to be `subpage.html`.
    login: {
      // entry for the page
      entry: "./src/pages/Login/main.js",
      // the source template
      template: "public/login.html",
      // output as dist/index.html
      filename: "login.html",
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Login Page",
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ["chunk-vendors", "chunk-common", "login"]
    },
    register: {
      // entry for the page
      entry: "./src/pages/Register/main.js",
      // the source template
      template: "public/register.html",
      // output as dist/index.html
      filename: "register.html",
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Register Page",
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ["chunk-vendors", "chunk-common", "register"]
    }
  }
};
