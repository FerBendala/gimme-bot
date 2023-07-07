const { By, Key, until } = require( 'selenium-webdriver' )
const { JSDOM } = require( 'jsdom' )
const { configureDriver } = require( '../drivers/selenium' )

const scrapeSupermarket = async ( url, postalCode ) => {
    // Configurar el driver de Selenium
    const driver = await configureDriver()

    // Abrir la URL especificada en el navegador
    await driver.get( url )

    // Esperar a que el elemento de código postal esté disponible en el DOM
    const inputPostalCode = await driver.wait(
        until.elementLocated( By.css( '.ym-hide-content' ) ),
        10000
    )

    // Introducir el código postal en el campo y presionar Enter
    await inputPostalCode.sendKeys( postalCode, Key.RETURN )

    // Esperar a que aparezca el elemento con la clase 'product-cell' en el DOM
    await driver.wait( until.elementLocated( By.className( 'product-cell' ) ), 10000 )

    // Hacer clic en el enlace de categorías
    const linkCategorias = await driver.wait(
        until.elementLocated( By.css( 'a.menu-item.subhead1-sb' ) ),
        10000
    )
    await linkCategorias.click()

    // Esperar a que aparezca el elemento con la clase 'product-cell' en el DOM
    await driver.wait( until.elementLocated( By.className( 'product-cell' ) ), 10000 )

    // Obtener el HTML de la página cargada en el navegador
    const html = await driver.getPageSource()

    // Crear un objeto JSDOM para manipular y analizar el HTML
    const dom = new JSDOM( html )

    // Devolver el documento del objeto JSDOM que representa la página
    return dom.window.document
}

module.exports = { scrapeSupermarket }
