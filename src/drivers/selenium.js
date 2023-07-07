const { Builder } = require( 'selenium-webdriver' )
const { Options } = require( 'selenium-webdriver/chrome' )

const configureDriver = async () => {
    const options = new Options()
    options.addArguments( '--headless' )
    const driver = await new Builder()
        .forBrowser( 'chrome' )
        .setChromeOptions( options )
        .build()
    return driver
}

module.exports = { configureDriver }