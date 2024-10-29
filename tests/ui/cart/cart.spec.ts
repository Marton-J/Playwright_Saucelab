import { test, expect, chromium, Page } from '@playwright/test';
import { LoginPage } from '../../../pageObjects/ui/loginPage';
import { InventoryPage } from '../../../pageObjects/ui/inventoryPage';
import { CartPage } from '../../../pageObjects/ui/cartPage';
import { locatorsInventory } from '../../../locators/ui/locatorsInventory';
import { locatorsCart } from '../../../locators/ui/locatorsCart';
import * as dotenv from 'dotenv';
import { CheckoutPage } from '../../../pageObjects/ui/checkoutPage';
import { locatorsCheckout } from '../../../locators/ui/locatorsCheckout';

dotenv.config();

let browser;
let page;
let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let checkoutPage: CheckoutPage;

test.describe('Inventory product flow standard_user', {
  tag: '@UI_Test_Inventory_Flow',
}, () => {

  test.beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.performLogin();
    await loginPage.login(process.env.USERNAME ?? '', process.env.PASSWORD ?? '');
    const currentUrl = await page.url();
    expect(currentUrl).toBe(locatorsInventory.inventoryPageTile);
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test('Cart Third product - Proceed to cart', async () => {
    const cartPage = new CartPage(page);
    await inventoryPage.addSecondElementToCart();
    await page.screenshot({ path: 'visual_comparison_data/inventory/addSecondElementToCart.png' });
    await inventoryPage.navigateToCart();
    await cartPage.verifyPageTitle();
    await cartPage.verifyCartQuantityLabel();
    await cartPage.verifyCartDescLabel();
    await cartPage.verifyRemoveButton();
    await cartPage.verifyContinueShoppingButton();
    await page.screenshot({ path: 'visual_comparison_data/cart/proceedToCheckout.png' });
    await page.locator(locatorsCart.continueShoppingButton).click();
    await inventoryPage.navigateToCart();
    await page.screenshot({ path: 'visual_comparison_data/cart/backToInventoryPage.png' });
  });

  test('Cart add last alphabetical product and product to the right based on price - Proceed to cart', async () => {
    const cartPage = new CartPage(page);
    await inventoryPage.inventoryProductSortByPrice();
    await inventoryPage.addLastElementToCart();
    await inventoryPage.verifyBadgeElement('1');
    await inventoryPage.inventoryProductSortByNameAZ();
    await inventoryPage.addSecondElementToCart();
    await inventoryPage.verifyBadgeElement('2');
    const inventoryNames = await inventoryPage.getInventoryItemNames();
    await inventoryPage.navigateToCart();
    const cartNames = await cartPage.getCartItemNames();
    expect(cartNames.sort()).toEqual(inventoryNames.sort());
    await cartPage.verifyBadgeElement('2');
    await page.click(locatorsCart.checkOutButton);
    await checkoutPage.verifyBadgeElement('2');
    await checkoutPage.fillFirstName(locatorsCheckout.firstNameValue);
    await checkoutPage.fillLastName(locatorsCheckout.lastNameValue);
    await checkoutPage.fillPostalCode(locatorsCheckout.postalCodeValue);
    await checkoutPage.verifyInputValues(locatorsCheckout.firstNameValue, locatorsCheckout.lastNameValue, locatorsCheckout.postalCodeValue);
    await page.click(locatorsCheckout.continueButton)
    await checkoutPage.verifyBadgeElement('2');
    const checkoutNames = await cartPage.getCartItemNames();
    expect(checkoutNames.sort()).toEqual(inventoryNames.sort());
    expect(checkoutNames.sort()).toEqual(cartNames.sort());
    await page.click(locatorsCheckout.finishButton);
// Complete

await page.locator('[data-test="title"]').isVisible();
const completeTitle = await page.locator('[data-test="title"]').innerText();
expect(completeTitle).toBe('Checkout: Complete!');
await page.locator('[data-test="complete-header"]').isVisible();
const completeHeader = await page.locator('[data-test="complete-header"]').innerText();
expect(completeHeader).toBe('Thank you for your order!');
await page.locator('[data-test="complete-text"]').isVisible();
const completeHeaderText = await page.locator('[data-test="complete-text"]').innerText();
expect(completeHeaderText).toContain('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
await page.locator('[data-test="title"]').isVisible();
await page.getByText('Swag Labs').isVisible();

await page.screenshot({ path: 'CompletePage.png' });
  });
});

