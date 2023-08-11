const global = {
    title: 'h1',
    subtitle: 'h2',
    section: '.body',
    card: {
        card: '.product',
        name: '.product-name .ellipsis',
        price: '.product-price',
        image: 'img'
    },
}

const getProductsJson = ( document ) => {
    const sections = Array.from( document.querySelectorAll( global.section ) )

    const products = sections.reduce( ( result, section ) => {
        const sectionTitle = section.querySelector( global.subtitle )?.textContent || ''
        const productCards = Array.from( section.querySelectorAll( global.card.card ) )

        const sectionProducts = productCards.map( card => {
            const name = card.querySelector( global.card.name )?.textContent || ''
            const price = card.querySelector( global.card.price )?.textContent.split( '/' )[0] || ''
            const image = card.querySelector( global.card.image )?.src || ''

            console.log( `\x1b[96m -- ${name} \x1b[0m` )

            return { name, image, price }
        } )

        return { ...result, [sectionTitle]: sectionProducts }
    }, {} )

    return products
}

module.exports = { getProductsJson }
