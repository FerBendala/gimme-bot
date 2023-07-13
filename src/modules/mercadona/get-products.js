const { By } = require( 'selenium-webdriver' )
const { getPageHtml } = require( './get-html' )
const { getProductsJson } = require( './get-products-json' )

const getProducts = async ( driver ) => {
    // Define la función de espera personalizada
    const waitForProductCellImgSrc = async () => {
        const elements = await driver.findElements(
            By.css( '.product-cell img' )
        )

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
    const categoryPage = await getPageHtml( driver )
    const categoryProducts = await getProductsJson( categoryPage )
    return categoryProducts
}

module.exports = { getProducts }