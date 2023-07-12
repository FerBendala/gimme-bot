const { By, Key, until } = require( 'selenium-webdriver' )
const { JSDOM } = require( 'jsdom' )
const { configureDriver } = require( '../drivers/selenium' )
const { getProducts } = require( './get-products' )

const elementClick = async ( type, driver, element ) => {
    try {
        await driver.sleep( 500 )
        const elementToClick = await driver.wait(
            until.elementLocated( element ),
            10000
        )

        await elementToClick.click()
    } catch {
        console.log( `${type} not found` )
    }
}

const getButton = ( text ) => {
    return By.xpath( `//button[contains(., "${text}")]` )
}

const getButtonSubCategory = ( text ) => {
    return By.xpath( `//button[contains(text(), "${text}")]` )
}

const getSectionProducts = async ( driver ) => {
    // Define la función de espera personalizada
    const waitForProductCellImgSrc = async () => {
        const elements = await driver.findElements( By.css( '.product-cell img' ) )
        for ( const element of elements ) {
            await driver.sleep( 500 )
            const src = await element.getAttribute( 'src' )
            if ( src && src.startsWith( 'https://' ) ) {
                return true // El atributo 'src' coincide, se cumple la condición
            }
        }
        return false // Ningún elemento coincide con la condición, se continua esperando
    }

    // Espera hasta que se cumpla la condición o hasta que transcurran 10 segundos
    await driver.wait( waitForProductCellImgSrc, 10000 )

    // Obtiene el HTML y crea un objeto JSDOM para manipular y analizar el HTML
    const category = await driver.getPageSource()
    const categoryPage = new JSDOM( category )
    const categoryProducts = await getProducts( categoryPage.window.document )
    return categoryProducts
}

const clickAndGetProducts = async ( driver, name ) => {
    await elementClick( `${name} button`, driver, getButtonSubCategory( name ) )
    return await getSectionProducts( driver )
}

const getAllCategories = async ( driver ) => {
    const page = await driver.getPageSource()
    const html = new JSDOM( page )
    const document = html.window.document
    const allCategories = Array.from( document.querySelectorAll( '.category-menu__header' ) )
    const getAllCategories = allCategories.map( category => category.textContent )

    return getAllCategories
}

const getAllSubCategories = async ( driver ) => {
    const page = await driver.getPageSource()
    const html = new JSDOM( page )
    const document = html.window.document
    const allCategories = Array.from( document.querySelectorAll( '.category-item' ) )
    const getAllCategories = allCategories.map( category => category.textContent )

    return getAllCategories
}

const scrapeSupermarket = async ( url, postalCode ) => {
    // Configure Selenium, specify URL, and enter postal code
    const driver = await configureDriver()
    await driver.get( url )
    const inputPostalCode = await driver.wait( until.elementLocated( By.css( '.ym-hide-content' ) ), 10000 )
    await inputPostalCode.sendKeys( postalCode, Key.RETURN )


    // Go to categories and remove cookies banner
    await elementClick( 'Cookies button', driver, getButton( 'Aceptar todas' ) )
    await elementClick( 'Categories button', driver, By.css( 'a[href="/categories"]' ) )

    await driver.sleep( 1000 )
    const allCategories = await getAllCategories( driver )

    const products = {}

    for ( let category of allCategories ) {
        console.log( `\x1b[32m ${category}  \x1b[0m` )
        await elementClick( category, driver, getButton( category ) )
        const allSubCategories = await getAllSubCategories( driver )

        products[category] = {}

        for ( let subCategory of allSubCategories ) {
            console.log( `\x1b[92m - ${subCategory}  \x1b[0m` )

            const subCategoryProducts = await clickAndGetProducts( driver, subCategory )
            products[category][subCategory] = subCategoryProducts
        }
    }

    return products
}

module.exports = { scrapeSupermarket }
