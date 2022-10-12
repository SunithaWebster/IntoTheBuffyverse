const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      // include any other plugin code...
      // cypress/integration/**/*.js
      // It's IMPORTANT to return the config object
      // with any changed environment variables
      on("file:preprocessor", require("@cypress/code-coverage/use-babelrc"));
      return config;
    },
    specPattern: "cypress/integration/*spec.js",
  },
});
