const getProducts = ( document ) => {
    const productos = []
    const productCells = document.getElementsByClassName( 'product-cell' )

    for ( const productCell of productCells ) {
        const name = productCell.querySelector( '.product-cell__description-name' ).textContent
        let price
        const productPrice = productCell.querySelector( '.product-price__unit-price' )
        if ( productPrice ) {
            price = productPrice.textContent
        } else {
            price = 'No disponible'
        }
        productos.push( { name, price } )
    }
    return productos
}

module.exports = { getProducts }