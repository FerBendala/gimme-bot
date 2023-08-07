const { By, Actions } = require( 'selenium-webdriver' )


const getButton = ( text ) => {
    return By.xpath( `//button[contains(., "${text}")]` )
}

const getButtonSubCategory = ( text ) => {
    return By.xpath( `//button[contains(text(), "${text}")]` )
}

const hoverText = async ( driver, text ) => {
    const element = await driver.findElement( By.xpath( `//*[contains(text(), "${text}")]` ) )
    const actions = driver.actions( { bridge: true } )
    await actions.move( { origin: element } ).perform()
}

module.exports = {
    getButton,
    getButtonSubCategory,
    hoverText
}