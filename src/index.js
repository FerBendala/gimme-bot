const { getFormattedDate } = require( './utils/date' )
const { writeJson } = require( './utils/file' )
const { scrapeSupermarket } = require( './modules/scraping' )
const { getProducts } = require( './modules/get-products' )

const main = async () => {
    const url = 'https://tienda.mercadona.es/'
    const postalCode = '08028'
    const document = await scrapeSupermarket( url, postalCode )
    const products = getProducts( document )

    await writeJson( products, `./data/products-${getFormattedDate()}.json` )
}

main().catch( console.error )