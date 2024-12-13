const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      setupNodeEvents(on, config) {
      chromeWebSecurity: false

      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          // fullPage screenshot size is 430x932 on non-retina screens
          // and 430x932 on retina screens
          launchOptions.args.push('--window-size=430,932')

          // force screen to be non-retina (430x932 size)
          launchOptions.args.push('--force-device-scale-factor=1')

          // force screen to be retina (2800x2400 size)
          // launchOptions.args.push('--force-device-scale-factor=2')
        }

        if (browser.name === 'electron' && browser.isHeadless) {
          // fullPage screenshot size is 430x932
          launchOptions.preferences.width = 430
          launchOptions.preferences.height = 932
        }

        if (browser.name === 'firefox' && browser.isHeadless) {
          // menubars take up height on the screen
          // so fullPage screenshot size is 430x932
          launchOptions.args.push('--width=430')
          launchOptions.args.push('--height=932')
        }

        return launchOptions
      })
    },
  },
});