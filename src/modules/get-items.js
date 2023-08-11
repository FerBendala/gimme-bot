const { By } = require( 'selenium-webdriver' )

const getButton = ( text ) => {
    return By.xpath( `//button[contains(., "${text}")]` )
}

const getButtonWithOnlyText = ( text ) => {
    return By.xpath( `//button[contains(text(), "${text}")]` )
}

const getLink = ( text ) => {
    return By.xpath( `//a[contains(text(), "${text}")]` )
}

module.exports = {
    getButton,
    getButtonWithOnlyText,
    getLink
}