const { By } = require( 'selenium-webdriver' )

const getButton = ( text ) => {
    return By.xpath( `//button[contains(., "${text}")]` )
}

const getButtonSubCategory = ( text ) => {
    return By.xpath( `//button[contains(text(), "${text}")]` )
}

module.exports = {
    getButton,
    getButtonSubCategory
}