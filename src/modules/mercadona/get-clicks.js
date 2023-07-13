const { until } = require( 'selenium-webdriver' )
const { getProducts } = require( './get-products' )
const { getButtonSubCategory } = require( './get-buttons' )

const elementClick = async ( type, driver, element ) => {
    try {
        await driver.sleep( 500 )
        const elementToClick = await driver.wait(
            until.elementLocated( element ),
            10000
        )

        await elementToClick.click()
    } catch {
        console.log( `${type} not found` )
    }
}

const clickCategoriesAndGetProducts = async ( driver, name ) => {
    await elementClick( `${name} button`, driver, getButtonSubCategory( name ) )
    return await getProducts( driver )
}

module.exports = {
    elementClick,
    clickCategoriesAndGetProducts
}