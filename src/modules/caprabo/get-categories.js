const { getPageHtml } = require( '../get-html' )

const getAllCategories = async ( driver ) => {
    const document = await getPageHtml( driver )
    const allCategories = Array.from(
        document.querySelectorAll( '.dropdown-submenu + .submenu ul li a' )
    )
    const getAllCategories = allCategories.map( category => category.textContent )

    return getAllCategories
}

const getAllSubCategories = async ( driver ) => {
    const document = await getPageHtml( driver )
    const allCategories = Array.from(
        document.querySelectorAll( '.category-item' )
    )

    const getAllSubCategories = allCategories.map(
        category => category.textContent
    )

    return getAllSubCategories
}

module.exports = {
    getAllCategories,
    getAllSubCategories
}