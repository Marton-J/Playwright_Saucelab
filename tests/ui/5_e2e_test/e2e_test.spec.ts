import { test, expect, chromium, Page } from '@playwright/test';
import { LoginPage } from '../../../pageObjects/ui/loginPage';
import { InventoryPage } from '../../../pageObjects/ui/inventoryPage';
import { CartPage } from '../../../pageObjects/ui/cartPage';
import { locatorsInventory } from '../../../locators/ui/locatorsInventory';
import { locatorsCart } from '../../../locators/ui/locatorsCart';
import { CheckoutPage } from '../../../pageObjects/ui/checkoutPage';
import { locatorsCheckout } from '../../../locators/ui/locatorsCheckout';
import { locatorsComplete } from '../../../locators/ui/locatorsComplete';
import { CompletePage } from '../../../pageObjects/ui/completePage';

import * as dotenv from 'dotenv';

dotenv.config();

let browser;
let page;
let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let checkoutPage: CheckoutPage;
let completePage: CompletePage;
let cartPage: CartPage;

test.describe('E2E Test', {
  tag: '@UI_E2E_Test_Flow',
}, () => {

  test.beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
    completePage = new CompletePage(page);
    cartPage = new CartPage(page);
    await loginPage.performLogin();
//    await page.screenshot({ path: 'visualComparisonImages/01_login.png' });
    await loginPage.login(process.env.USERNAME ?? '', process.env.PASSWORD ?? '');
    const currentUrl = await page.url();
    expect(currentUrl).toBe(locatorsInventory.inventoryPageTile);
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test('Cart add last alphabetical product and product to the right based on price - Proceed to cart', async () => {
// Inventory Page
    await page.screenshot({ path: 'visualComparisonImages/02_inventory.png' });
    await inventoryPage.inventoryProductSortByPrice();
    await inventoryPage.addLastElementToCart();
    await page.screenshot({ path: 'visualComparisonImages/03_addLastElementToCartBasedOnPrice.png' });
    await inventoryPage.verifyBadgeElement('1');
    await inventoryPage.inventoryProductSortByNameAZ();
    await inventoryPage.addSecondElementToCart();
    await inventoryPage.verifyBadgeElement('2');
    await page.screenshot({ path: 'visualComparisonImages/04_addSecondElementToCartBasedOnAlphabeticalOrder.png' });
    const inventoryNames = await inventoryPage.getInventoryItemNames();
    await inventoryPage.navigateToCart();
// Cart Page
    await page.screenshot({ path: 'visualComparisonImages/06_navigateToCart.png' });
    const cartNames = await cartPage.getCartItemNames();
    expect(cartNames.sort()).toEqual(inventoryNames.sort());
    await cartPage.verifyBadgeElement('2');
    await page.click(locatorsCart.checkOutButton);
// Your Information Page
    await page.screenshot({ path: 'visualComparisonImages/07_navigateToYourInformation.png' });
    await checkoutPage.verifyBadgeElement('2');
    await checkoutPage.fillFirstName(locatorsCheckout.firstNameValue);
    await checkoutPage.fillLastName(locatorsCheckout.lastNameValue);
    await checkoutPage.fillPostalCode(locatorsCheckout.postalCodeValue);
    await checkoutPage.verifyInputValues(locatorsCheckout.firstNameValue, locatorsCheckout.lastNameValue, locatorsCheckout.postalCodeValue);
// Information filled out
    await page.screenshot({ path: 'visualComparisonImages/08_informationFilledOut.png' });
    await page.click(locatorsCheckout.continueButton)
// Overview Page
    await page.screenshot({ path: 'visualComparisonImages/09_navigateToOverview.png' });
    await checkoutPage.verifyBadgeElement('2');
    const checkoutNames = await cartPage.getCartItemNames();
    expect(checkoutNames.sort()).toEqual(inventoryNames.sort());
    expect(checkoutNames.sort()).toEqual(cartNames.sort());
    await page.click(locatorsCheckout.finishButton);
// Complete Page
    await completePage.verifyCompletePage(locatorsComplete);
    await page.screenshot({ path: 'visualComparisonImages/10_CompleteE2eTest.png' });
  });

  test('Visual test - Proceed to cart', async ({ page }) => {
    // Inventory Page
    const screenshotPath = 'locators/visualComparisonLocators/02_inventory.png';
    const snapshotPath = 'tests/ui/5_e2e_test/e2e_test.spec.ts-snapshots/locators-visualComparisonLocators-02-inventory-chromium-darwin.png';
  
    // Check if snapshot exists
    const fs = require('fs');
    if (!fs.existsSync(snapshotPath)) {
      // Generate the snapshot
      await page.screenshot({ path: screenshotPath });
    }
  
    // Compare the screenshot
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot(screenshotPath);
    await inventoryPage.inventoryProductSortByPrice();
    await inventoryPage.addLastElementToCart();
  });

  test.afterEach(async () => {
    await page.close();
  });
});