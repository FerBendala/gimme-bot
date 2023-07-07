const { writeFile } = require( 'fs' )
const { promisify } = require( 'util' )

const writeFileAsync = promisify( writeFile )

const writeCsv = async ( productos, filename ) => {
    const csvData = [['Nombre del Producto', 'Precio'], ...productos,]
    const csvContent = csvData.map( ( row ) => row.join( ',' ) ).join( '\n' )
    await writeFileAsync( filename, csvContent, 'utf8' )
}

const writeJson = async ( products, filename ) => {
    const jsonData = products
    const jsonString = JSON.stringify( jsonData, null, 2 )
    await writeFileAsync( filename, jsonString, 'utf8' )
}

module.exports = {
    writeCsv,
    writeJson
}