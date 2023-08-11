const { until } = require( 'selenium-webdriver' )
const { getProducts } = require( './mercadona/get-products' )
const { getButtonWithOnlyText } = require( './get-items' )

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
    await elementClick( `${name} button`, driver, getButtonWithOnlyText( name ) )
    return await getProducts( driver )
}

module.exports = {
    elementClick,
    clickCategoriesAndGetProducts
}