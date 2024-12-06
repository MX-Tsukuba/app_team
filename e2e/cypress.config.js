const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseurl : "https://localhost:3000/",
    login_id : "reyree41@gmail.com",
    password : "abc123",
    setupNodeEvents(on, config) {
      chromeWebSecurity: false
      // implement node event listeners here
    },
  },
});