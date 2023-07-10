const { By, Key, until } = require( 'selenium-webdriver' )
const { JSDOM } = require( 'jsdom' )
const { configureDriver } = require( '../drivers/selenium' )
const { getProducts } = require( './get-products' )

const scrapeSupermarket = async ( url, postalCode ) => {
    // Configure Selenium, specify URL, and enter postal code
    const driver = await configureDriver()
    await driver.get( url )

    const inputPostalCode = await driver.wait( until.elementLocated( By.css( '.ym-hide-content' ) ), 10000 )
    await inputPostalCode.sendKeys( postalCode, Key.RETURN )

    // Click on cookies if present
    try {
        await driver.wait( until.elementLocated( By.css( '.cookie-banner' ) ), 10000 )
        const acceptCookies = await driver.wait( until.elementLocated( By.xpath( "//button[contains(text(), 'Aceptar todas')]" ) ), 10000 )
        await acceptCookies.click()
    } catch ( error ) {
        console.log( "Accept cookies button not found" )
        try {
            await driver.sleep( 1000 )
            const acceptCookies = await driver.wait( until.elementLocated( By.xpath( "//button[contains(text(), 'Aceptar todas')]" ) ), 10000 )
            await acceptCookies.click()
        } catch ( error ) {
            console.log( "Accept cookies button not found (second attempt)" )
        }
    }


    // // Click on categories link if present
    // try {
    //     await driver.wait( until.elementLocated( By.css( 'a[href="/categories"]' ) ), 10000 )

    //     const linkCategories = await driver.wait( until.elementLocated( By.css( 'a[href="/categories"]' ) ), 10000 )

    //     await linkCategories.click()
    // } catch ( error ) {
    //     console.log( "Categories not found", error )
    // }

    // Get the HTML and create a JSDOM object to manipulate and parse the HTML
    await driver.wait( until.elementLocated( By.className( 'product-cell' ) ), 10000 )

    const html = await driver.getPageSource()
    const dom = new JSDOM( html )

    return dom.window.document
}

module.exports = { scrapeSupermarket }
