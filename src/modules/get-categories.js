const getCategories = async ( document ) => {
    const allCategories = Array.from( document.querySelectorAll( '.category-menu__header' ) )
    const getAllCategories = allCategories.map( category => category.textContent )
    return getAllCategories
}

module.exports = { getCategories }