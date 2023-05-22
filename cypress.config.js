import { defineConfig } from 'cypress';

module.exports = defineConfig({
  env: {
    "credential-email": 'bellmin9321@gmail.com',
    "credential-pwd": 'cypress',
  },
  e2e: {
    experimentalStudio: true,
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
