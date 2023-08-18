// Generic
const { By, Key, until } = require( 'selenium-webdriver' )
const { configureDriver } = require( '../../drivers/selenium' )
const { getButton } = require( '../get-items' )
const { elementClick, clickCategoriesAndGetProducts } = require( '../get-clicks' )

// Specific
const { getAllCategories, getAllSubCategories } = require( './get-categories' )
const { navigateToUrl } = require( '../navigate-to-url' )

const scrapeMercadona = async () => {
    // Configure Selenium and specify URL
    const url = 'https://tienda.mercadona.es/'
    const driver = await configureDriver()
    await navigateToUrl( driver, url )

    // 
    const postalCode = '08029'
    const inputPostalCode = await driver.wait( until.elementLocated( By.css( '.ym-hide-content' ) ), 10000 )
    await inputPostalCode.sendKeys( postalCode, Key.RETURN )

    // Go to categories and remove cookies banner
    await elementClick( 'Cookies button', driver, getButton( 'Aceptar todas' ) )
    await elementClick( 'Categories button', driver, By.css( 'a[href="/categories"]' ) )

    // Set empty products
    const products = {}

    // Categories iteration
    await driver.sleep( 1000 )
    const allCategories = await getAllCategories( driver )

    for ( let category of allCategories ) {
        // View category on console
        console.log( `\x1b[32m ${category}  \x1b[0m` )

        // Get subcategories
        await elementClick( category, driver, getButton( category ) )
        const allSubCategories = await getAllSubCategories( driver )

        // Set empty category
        products[category] = {}

        for ( let subCategory of allSubCategories ) {
            // View subcategory on console
            console.log( `\x1b[92m - ${subCategory}  \x1b[0m` )

            // Go to subcategory
            const subCategoryProducts = await clickCategoriesAndGetProducts( driver, subCategory )

            // Save subcategory content
            products[category][subCategory] = subCategoryProducts
        }
    }

    return products
}

module.exports = { scrapeMercadona }
