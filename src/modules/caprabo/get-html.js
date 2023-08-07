const { JSDOM } = require( 'jsdom' )

const getPageHtml = async ( driver ) => {
    const page = await driver.getPageSource()
    const html = new JSDOM( page )
    return html.window.document
}

module.exports = { getPageHtml }