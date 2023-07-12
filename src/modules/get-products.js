const global = {
    title: 'h1',
    subtitle: 'h2',
    section: 'section[data-test="section"]',
    card: {
        card: '.product-cell',
        name: '.product-cell__description-name',
        description: '.product-format',
        previousPrice: '.product-price__previous-unit-price',
        price: '.product-price__unit-price',
        image: 'img'
    },
}

const getProducts = document => {
    const title = document.querySelector( global.title ).textContent
    const sections = Array.from( document.querySelectorAll( global.section ) )

    const products = sections.reduce( ( result, section ) => {
        const sectionTitle = section.querySelector( global.subtitle ).textContent
        const productCards = Array.from( section.querySelectorAll( global.card.card ) )

        const sectionProducts = productCards.map( card => {
            const name = card.querySelector( global.card.name )?.textContent || ''
            const description = card.querySelector( global.card.description )?.textContent || ''
            const previuousPrice = card.querySelector( global.card.previousPrice )?.textContent || ''
            const price = card.querySelector( global.card.price )?.textContent || ''
            const image = card.querySelector( global.card.image )?.src || ''

            console.log( image.startsWith( "https://" ) )

            return { name, description, image, previuousPrice, price }
        } )

        return { ...result, [sectionTitle]: sectionProducts }
    }, {} )


    return products
}

module.exports = { getProducts }
