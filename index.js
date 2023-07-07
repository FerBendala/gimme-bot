const { getFormattedDate } = require( './src/utils/date' )
const { writeJson } = require( './src/utils/file' )
const { scrapeSupermarket } = require( './src/modules/scraping' )
const { getProducts } = require( './src/modules/get-products' )

const main = async () => {
    const url = 'https://tienda.mercadona.es/'
    const codigo_postal = '08028'
    const document = await scrapeSupermarket( url, codigo_postal )
    const productos = getProducts( document )

    productos.sort( ( a, b ) => a.price.localeCompare( b.price ) )
    await writeJson( productos, `list/products-${getFormattedDate()}.json` )
}

main().catch( console.error )