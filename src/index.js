const path = require( 'path' )
const { getFormattedDate } = require( './utils/date' )
const { writeJson } = require( './utils/file' )
const { createFolder } = require( './utils/folder' )
const { scrapeMercadona } = require( './modules/mercadona/scraping' )
const { scrapeCaprabo } = require( './modules/caprabo/scraping' )

const main = async () => {
    const capraboFolder = await createFolder( 'data/caprabo' )
    const mercadonaFolder = await createFolder( 'data/mercadona' )

    // Scraping supermarket
    const scrapingCaprabo = await scrapeCaprabo()
    const scrapingMercadona = await scrapeMercadona()

    // Write json with info
    await writeJson( scrapingCaprabo, path.join(
        capraboFolder, `caprabo.${getFormattedDate()}.json`
    ) )
    await writeJson( scrapingMercadona, path.join(
        mercadonaFolder, `mercadona.${getFormattedDate()}.json`
    ) )
}

main().catch( console.error )
