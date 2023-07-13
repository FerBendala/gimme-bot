const fs = require( 'fs' )
const path = require( 'path' )
const { getFormattedDate } = require( './utils/date' )
const { writeJson } = require( './utils/file' )
const { scrapeSupermarket } = require( './modules/mercadona/scraping' )

const main = async () => {
    const url = 'https://tienda.mercadona.es/'
    const postalCode = '08028'
    const scraping = await scrapeSupermarket( url, postalCode )

    const dataFolder = path.join( __dirname, 'data' )
    if ( !fs.existsSync( dataFolder ) ) {
        fs.mkdirSync( dataFolder )
    }

    const filename = `products-${getFormattedDate()}.json`
    const filePath = path.join( dataFolder, filename )

    await writeJson( scraping, filePath )
}

main().catch( console.error )
