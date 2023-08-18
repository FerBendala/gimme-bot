const { getPageHtml } = require( '../get-html' )

const getAllCategories = async ( driver ) => {
    const document = await getPageHtml( driver )

    const removeCat1 = '[data-act1="submenu-ofertas-1001"]'
    const removeCat2 = '[data-act1="submenu-de-la-nostra-terra-8150"]'

    const allCategories = Array.from(
        document.querySelectorAll(
            `.dropdown-submenu:not(${removeCat1}):not(${removeCat2}) + .submenu ul li a`
        )
    )

    const getAllCategories = allCategories.map( category => {
        const text = category.textContent
        const formatedText = text.replace( /"/g, '' )
        return formatedText
    } )

    return getAllCategories
}

module.exports = {
    getAllCategories
}