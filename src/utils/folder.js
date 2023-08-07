const fs = require( 'fs' )
const path = require( 'path' )

const createFolder = () => {
    const dataFolder = path.join( __dirname, '../data' )

    // Create data folder if not exists
    if ( !fs.existsSync( dataFolder ) ) {
        fs.mkdirSync( dataFolder )
    }

    return dataFolder
}

module.exports = { createFolder }