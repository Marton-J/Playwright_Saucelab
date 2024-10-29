import { test, expect, chromium, Page } from '@playwright/test';
import { LoginPage } from '../../../pageObjects/ui/loginPage';
import { InventoryPage } from '../../../pageObjects/ui/inventoryPage';
import { CartPage } from '../../../pageObjects/ui/cartPage';
import { locatorsInventory } from '../../../locators/ui/locatorsInventory';
import { locatorsCart } from '../../../locators/ui/locatorsCart';
import * as dotenv from 'dotenv';
import { CheckoutPage } from '../../../pageObjects/ui/checkoutPage';

dotenv.config();

let browser;
let page;
let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let checkoutPage: CheckoutPage;

test.describe('Cart product flow standard_user', {
  tag: '@UI_Test_Cart_Flow',
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

  test('Cart Second product - Proceed to cart', async () => {
    const cartPage = new CartPage(page);
    await inventoryPage.addSecondElementToCart();
    await inventoryPage.navigateToCart();
    await cartPage.verifyPageTitle();
    await cartPage.verifyCartQuantityLabel();
    await cartPage.verifyCartDescLabel();
    await cartPage.verifyRemoveButton();
    await cartPage.verifyContinueShoppingButton();
    await page.locator(locatorsCart.continueShoppingButton).click();
    await inventoryPage.navigateToCart();
  });

  test('Cart add two products - Verify Content', async () => {
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
  });
});

