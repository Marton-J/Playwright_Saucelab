import { test, expect } from '@playwright/test';
import { setup, teardown, page, inventoryPage, cartPage, checkoutPage, completePage } from '../../../util/ui/setup';
import { locatorsCart } from '../../../locators/ui/locatorsCart';
import { locatorsCheckout } from '../../../locators/ui/locatorsCheckout';
import { locatorsComplete } from '../../../locators/ui/locatorsComplete';
import { snapshotPath02, snapshotPath03, snapshotPath04, screenshotPath02, screenshotPath03, screenshotPath04 } from '../../../util/ui/constants';

test.describe('E2E Test', {
  tag: '@UI_E2E_Test_Flow',
}, () => {

  test.beforeEach(async () => {
    await setup();
  });

  test.afterEach(async () => {
    await teardown();
  });

  test('Cart add last alphabetical product and product to the right based on price - Complete flow', async () => {
    // Inventory Page
    await inventoryPage.inventoryProductSortByPrice();
    await inventoryPage.addLastElementToCart();
    await inventoryPage.verifyBadgeElement('1');
    await inventoryPage.inventoryProductSortByNameAZ();
    await inventoryPage.addSecondElementToCart();
    await inventoryPage.verifyBadgeElement('2');
    const inventoryNames = await inventoryPage.getInventoryItemNames();
    await inventoryPage.navigateToCart();
    // Cart Page
    const cartNames = await cartPage.getCartItemNames();
    expect(cartNames.sort()).toEqual(inventoryNames.sort());
    await cartPage.verifyBadgeElement('2');
    await page.click(locatorsCart.checkOutButton);
    // Your Information Page
    await checkoutPage.verifyBadgeElement('2');
    await checkoutPage.fillFirstName(locatorsCheckout.firstNameValue);
    await checkoutPage.fillLastName(locatorsCheckout.lastNameValue);
    await checkoutPage.fillPostalCode(locatorsCheckout.postalCodeValue);
    await checkoutPage.verifyInputValues(locatorsCheckout.firstNameValue, locatorsCheckout.lastNameValue, locatorsCheckout.postalCodeValue);
    // Information filled out
    await checkoutPage.clickContinueButton();
    // Overview Page
    await checkoutPage.verifyBadgeElement('2');
    const checkoutNames = await cartPage.getCartItemNames();
    expect(checkoutNames.sort()).toEqual(inventoryNames.sort());
    expect(checkoutNames.sort()).toEqual(cartNames.sort());
    await page.click(locatorsCheckout.finishButton);
    // Complete Page
    await completePage.verifyCompletePage(locatorsComplete);
  });

  test('Visual comparison test - Part of user flow', async () => {
    await checkoutPage.takeScreenshotIfNotExists(page, snapshotPath02, screenshotPath02);
    await inventoryPage.inventoryProductSortByPrice();
    await inventoryPage.addLastElementToCart();
    await checkoutPage.takeScreenshotIfNotExists(page, snapshotPath03, screenshotPath03);
    await inventoryPage.verifyBadgeElement('1');
    await inventoryPage.inventoryProductSortByNameAZ();
    await inventoryPage.addSecondElementToCart();
    await inventoryPage.verifyBadgeElement('2');
    await checkoutPage.takeScreenshotIfNotExists(page, snapshotPath04, screenshotPath04);
  });
});