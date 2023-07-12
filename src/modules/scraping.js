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

const getSectionProducts = async ( driver ) => {
    const productCellSelector = '.product-cell img'

    // Define la función de espera personalizada
    const waitForProductCellImgSrc = async () => {
        const elements = await driver.findElements( By.css( productCellSelector ) )
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
    await elementClick( `${name} button`, driver, getButton( name ) )
    return await getSectionProducts( driver )
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


    // Aceite, especias y salsas
    const aceiteProducts = await getSectionProducts( driver, 'Aceite, vinagre y sal' )
    const especiasProducts = await clickAndGetProducts( driver, 'Especias' )
    const salsasProducts = await clickAndGetProducts( driver, 'Mayonesa, ketchup y mostaza' )
    const otrasSalsasProducts = await clickAndGetProducts( driver, 'Otras salsas' )

    // Agua y refrescos
    await elementClick( 'Agua y refrescos', driver, getButton( 'Agua y refrescos' ) )
    const aguaProducts = await clickAndGetProducts( driver, 'Agua' )
    const isotonicoProducts = await clickAndGetProducts( driver, 'Isotónico y energético' )
    const colaProducts = await clickAndGetProducts( driver, 'Refresco de cola' )
    const sodaProducts = await clickAndGetProducts( driver, 'Refresco de naranja y de limón' )
    const tonicaProducts = await clickAndGetProducts( driver, 'Tónica y bitter' )
    const refrescoProducts = await clickAndGetProducts( driver, 'Refresco de té y sin gas' )

    await driver.quit()

    const products = {
        'Aceite, especias y salsas': {
            'Aceite, vinagre y sal': aceiteProducts,
            'Especias': especiasProducts,
            'Salsas': salsasProducts,
            'Otras salsas': otrasSalsasProducts,
        },
        'Agua y refrescos': {
            'Agua': aguaProducts,
            'Isotónico y energético': isotonicoProducts,
            'Refresco de cola': colaProducts,
            'Refresco de naranja y de limón': sodaProducts,
            'Tónica y bitter': tonicaProducts,
            'Refresco de té y sin gas': refrescoProducts,
        }
    }


    return products
}

module.exports = { scrapeSupermarket }
