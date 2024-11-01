import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../../../pageObjects/ui/loginPage';
import { InventoryPage } from '../../../pageObjects/ui/inventoryPage';
import { locatorsInventory } from '../../../locators/ui/locatorsInventory';

import * as dotenv from 'dotenv';

dotenv.config();

let browser: import('@playwright/test').Browser;
let page: import('@playwright/test').Page;
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
    const currentUrl = page.url();
    expect(currentUrl).toBe(locatorsInventory.inventoryPageTile);
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test('Inventory product - Sort on: Price (low to high)', async () => {
    await inventoryPage.inventoryProductSortByPrice();
  });

  test('Inventory Last product - Add the Product to the cart', async () => {
    await inventoryPage.addLastElementToCart();
  });

  test('Inventory product - Sort on: Name (A to Z)', async () => {
    await page.getByText(locatorsInventory.sortByName).isVisible();
    await page.getByText(locatorsInventory.sortByName).click();
    await inventoryPage.inventoryProductSortByNameAZ();
  });
});