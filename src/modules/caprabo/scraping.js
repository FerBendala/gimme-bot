// Generic
const { By, Key, until } = require( 'selenium-webdriver' )
const { configureDriver } = require( '../../drivers/selenium' )
const { getPageHtml } = require( '../get-html' )
const { elementClick, clickCategoriesAndGetProducts } = require( '../get-clicks' )
const { getButton, getLink } = require( '../get-items' )

// Specific
const { getAllCategories, getAllSubCategories } = require( './get-categories' )
const { getProductsJson } = require( './get-products-json' )


const scrapeCaprabo = async () => {
    // Configure Selenium and specify URL
    const url = 'https://www.capraboacasa.com/portal/es'
    const driver = await configureDriver()
    await driver.get( url )

    // Go to categories and remove cookies banner
    await elementClick( 'Cookies button', driver, getButton( 'ACEPTAR COOKIES' ) )

    // Categories iteration
    await driver.sleep( 1000 )
    const allCategories = await getAllCategories( driver )

    for ( let category of allCategories ) {
        // View category on console
        console.log( `\x1b[32m ${category} \x1b[0m` )

        // Get subcategories
        await elementClick( category, driver, getLink( category ) )

        const document = await getPageHtml( driver )

        getProductsJson( document )
    }

    // return products
}

module.exports = { scrapeCaprabo }
