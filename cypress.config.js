const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  projectId: "efz54g",
  e2e: {
    baseUrl: "https://demosite.titaniuminstitute.com.mx/wp-admin/admin.php?page=sch-dashboard",
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 60000,
    experimentalRunAllSpecs:true,
    setupNodeEvents(on, config) {
      allureCypress(on);
    },
  },
});
