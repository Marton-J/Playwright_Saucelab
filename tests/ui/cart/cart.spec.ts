import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../../../pageObjects/ui/loginPage';
import { InventoryPage } from '../../../pageObjects/ui/inventoryPage';
import { CartPage } from '../../../pageObjects/ui/cartPage';
import { locatorsInventory } from '../../../locators/ui/locatorsInventory';
import { locatorsCart } from '../../../locators/ui/locatorsCart';
import * as dotenv from 'dotenv';

dotenv.config();

let browser;
let page;
let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.describe('Inventory product flow standard_user', {
  tag: '@UI_Test_Inventory_Flow',
}, () => {

  test.beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
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
    await inventoryPage.addThirdElementToCart();
    await page.screenshot({ path: 'visual_comparison_data/inventory/addThirdElementToCart.png' });
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
});