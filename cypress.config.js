const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')
const cyAwaitPreprocessor = require('cypress-await/src/preprocessor-sync-mode')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on(
        'file:preprocessor',
        cyAwaitPreprocessor({
          specPattern: '**/*.sync.cy.js',
          debugOutput: true
        })
      )
      // console.log(config)
      allureWriter(on, config)
      return config
    },
    baseUrl: 'https://www.isolatedtraveller.com'
    // supportFile: true
  },
  // fixturesFolder: false,
  // isTextTerminal: true,
  chromeWebSecurity: false,
  experimentalMemoryManagement: true,
  viewportWidth: 1280,
  viewportHeight: 800,
  waitForAnimation: true,
  defaultCommandTimeout: 10000,
  execTimeout: 60000,
  pageLoadTimeout: 60000,
  requestTimeout: 30000,
  responseTimeout: 30000,
  screenshotOnRunFailure: true,
  failOnStatusCode: false,
  trashAssetsBeforeRuns: true,
  watchForFileChanges: false
})
