const navigateToUrl = async ( driver, url ) => {
    try {
        await driver.get( url );
        await driver.sleep( 1000 ); // You might need to adjust the sleep time if necessary
    } catch ( error ) {
        console.error( 'Error navigating to URL:', error );
    }
};

module.exports = {
    navigateToUrl
};