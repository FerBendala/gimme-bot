const { By, Key, until } = require('selenium-webdriver')
const { configureDriver } = require('../../drivers/selenium')
const { getButton } = require('../get-items')
const { elementClick, clickCategoriesAndGetProducts } = require('../get-clicks')
const { getAllSubCategories, getAllCategories } = require('./get-categories')
const { navigateToUrl } = require('../navigate-to-url')

const scrapeMercadona = async () => {
    const url = 'https://tienda.mercadona.es/'
    const driver = await configureDriver()
    await navigateToUrl(driver, url)

    const postalCode = '08029'
    const inputPostalCode = await driver.wait(until.elementLocated(By.css('.ym-hide-content')), 10000)
    await inputPostalCode.sendKeys(postalCode, Key.RETURN)

    await elementClick('Cookies button', driver, getButton('Aceptar todas'))
    await elementClick('Categories button', driver, By.css('a[href="/categories"]'))

    let products = []

    await driver.sleep(1000)
    const allCategories = await getAllCategories( driver )

    for (let category of allCategories) {
        console.log(`\x1b[32m ${category}  \x1b[0m`)

        await elementClick(category, driver, getButton(category))
        const allSubCategories = await getAllSubCategories(driver)

        for (let subCategory of allSubCategories) {
            console.log(`\x1b[92m - ${subCategory}  \x1b[0m`)

            const subCategoryProducts = await clickCategoriesAndGetProducts(driver, subCategory)
            products.push(...subCategoryProducts)
        }
    }

    return products
}

module.exports = { scrapeMercadona }
