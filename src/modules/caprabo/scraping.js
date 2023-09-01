// Generic
const { By } = require( 'selenium-webdriver' )
const { configureDriver } = require( '../../drivers/selenium' )
const { getPageHtml } = require( '../get-html' )
const { elementClick } = require( '../get-clicks' )
const { getButton, getLink } = require( '../get-items' )

// Specific
const { getAllCategories } = require( './get-categories' )
const { getProductsJson } = require( './get-products-json' )
const { navigateToUrl } = require( '../navigate-to-url' )


const scrapeCaprabo = async () => {
    // Configure Selenium and specify URL
    const url = 'https://www.capraboacasa.com/portal/es'
    const driver = await configureDriver()
    await navigateToUrl( driver, url )

    // Go to categories and remove cookies banner
    await elementClick( 'Cookies button', driver, getButton( 'ACEPTAR COOKIES' ) )

    // Set empty products
    let products = []

    // Categories iteration
    await driver.sleep( 1000 )
    const allCategories = await getAllCategories( driver )

    for ( let category of allCategories ) {
        // View category on console
        console.log( `\x1b[32m ${category} \x1b[0m` )

        // Get subcategory URL
        const subcategoryLink = getLink( category )
        const subcategoryElement = await driver.findElement( subcategoryLink )
        const subcategoryUrl = await subcategoryElement.getAttribute( 'href' )
        await navigateToUrl( driver, subcategoryUrl )

        let currentPage = 1
        let whileLap = true

        while ( whileLap ) {
            const document = await getPageHtml( driver )
            const nextPageCategoryProducts = getProductsJson( document )

            if ( !products[category] ) {
                products[category] = []
            }

            products = products.concat(nextPageCategoryProducts)

            try {
                // Go to the next page
                const nextPageLink = By.css( `ul.pagination li a[data-page="${currentPage + 1}"]` )
                const nextPageElement = await driver.findElement( nextPageLink )
                await nextPageElement.click()

                currentPage++
                await driver.sleep( 1000 )
            } catch ( error ) {
                // No next page, exit the loop
                whileLap = false
                break
            }
        }
    }

    return products
}

module.exports = { scrapeCaprabo }
