const fs = require( 'fs' );
const path = require( 'path' );
const { getFormattedDate } = require( './utils/date' );
const { writeJson } = require( './utils/file' );
const { scrapeSupermarket } = require( './modules/scraping' );
const { getProducts } = require( './modules/get-products' );

const main = async () => {
    const url = 'https://tienda.mercadona.es/';
    const postalCode = '08028';
    const document = await scrapeSupermarket( url, postalCode );
    const products = getProducts( document );

    const dataFolder = path.join( __dirname, 'data' );
    if ( !fs.existsSync( dataFolder ) ) {
        fs.mkdirSync( dataFolder );
    }

    const filename = `products-${getFormattedDate()}.json`;
    const filePath = path.join( dataFolder, filename );

    await writeJson( products, filePath );
};

main().catch( console.error );
