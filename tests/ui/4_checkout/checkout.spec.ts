import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../../../pageObjects/ui/loginPage.ts';
import { InventoryPage } from '../../../pageObjects/ui/inventoryPage.ts';
import { CartPage } from '../../../pageObjects/ui/cartPage.ts';
import { CheckoutPage } from '../../../pageObjects/ui/checkoutPage.ts';
import { locatorsInventory } from '../../../locators/ui/locatorsInventory.ts';
import { locatorsCart } from '../../../locators/ui/locatorsCart.ts';
import { locatorsCheckout } from '../../../locators/ui/locatorsCheckout.ts';

import * as dotenv from 'dotenv';

dotenv.config();

let browser: import('@playwright/test').Browser;
let page: import('@playwright/test').Page;
let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.describe('Checkout product flow standard_user', {
  tag: '@UI_Test_Checkout_Flow',
}, () => {

  test.beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.performLogin();
    await loginPage.login(process.env.USERNAME ?? '', process.env.PASSWORD ?? '');
    const currentUrl = await page.url();
    expect(currentUrl).toBe(locatorsInventory.inventoryPageTile);
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test('Inventory Third product - Proceed to checkout and press Cancel', async () => {
    const cartPage = new CartPage(page);
    await inventoryPage.addSecondElementToCart();
    await inventoryPage.navigateToCart();
    await page.isVisible(locatorsCart.checkOutButtonText);
    await page.click(locatorsCart.checkOutButton);
    await checkoutPage.verifyAppLogo();
    await checkoutPage.verifyTitle();
    await checkoutPage.verifyFirstNameInput();
    await checkoutPage.verifyLastNameInput();
    await checkoutPage.verifyPostalCodeInput();
    await checkoutPage.verifyCancelButton();
    await checkoutPage.verifyContinueButton();
    await checkoutPage.verifyBadgeElement('1');
    await checkoutPage.cancelFromCheckoutToCart();
  });

  test('Inventory Second product - Fill out customer details with valid customer information', async () => {
    const cartPage = new CartPage(page);
    await inventoryPage.addSecondElementToCart();
    await inventoryPage.navigateToCart();
    await page.isVisible(locatorsCart.checkOutButtonText);
    await page.click(locatorsCart.checkOutButton);
    await checkoutPage.fillFirstName(locatorsCheckout.firstNameValue);
    await checkoutPage.fillLastName(locatorsCheckout.lastNameValue);
    await checkoutPage.fillPostalCode(locatorsCheckout.postalCodeValue);
    await checkoutPage.verifyInputValues(locatorsCheckout.firstNameValue, locatorsCheckout.lastNameValue, locatorsCheckout.postalCodeValue);
    await page.click(locatorsCheckout.continueButton)
  });
});