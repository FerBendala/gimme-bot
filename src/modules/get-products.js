const getProducts = document => {
    const products = []
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
        products.push( { name, price } )
    }
    return products
}

module.exports = { getProducts }