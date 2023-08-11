const { By } = require( 'selenium-webdriver' )

const getButton = ( text ) => {
    return By.xpath( `//button[contains(., '${text}')]` )
}

const getButtonWithOnlyText = ( text ) => {
    return By.xpath( `//button[contains(text(), '${text}')]` )
}

const getLink = ( text ) => {
    const escapedText = text.replace( /"/g, '' );
    return By.xpath( `//a[contains(., '${escapedText}')]` )
}

module.exports = {
    getButton,
    getButtonWithOnlyText,
    getLink
}