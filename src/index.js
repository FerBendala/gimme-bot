const path = require( 'path' )
const { getFormattedDate } = require( './utils/date' )
const { writeJson } = require( './utils/file' )
const { createFolder } = require( './utils/folder' )
const { scrapeMercadona } = require( './modules/mercadona/scraping' )
const { scrapeCaprabo } = require( './modules/caprabo/scraping' )

const main = async () => {
    const dataFolder = await createFolder()

    // Naming file and pathing
    const filename = `products-${getFormattedDate()}.json`
    const filePath = path.join( dataFolder, filename )

    // Scraping supermarket
    const scraping = await scrapeCaprabo()
    // Mercadona
    // const scraping = await scrapeMercadona()

    // Write json with info
    await writeJson( scraping, filePath )
}

main().catch( console.error )
