import { defineConfig } from 'cypress';
import { plugins } from 'cypress-social-logins'


module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
