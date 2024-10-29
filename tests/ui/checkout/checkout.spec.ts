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

let browser;
let page;
let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.describe('Inventory product flow standard_user', {
  tag: '@UI_Test_Inventory_Flow',
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
    await page.screenshot({ path: 'visual_comparison_data/inventory/addSecondElementToCart.png' });
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
    await page.screenshot({ path: 'visual_comparison_data/your_information/checkoutPage.png' });
    await checkoutPage.cancelFromCheckoutToCart();
    await page.screenshot({ path: 'visual_comparison_data/cart/backToCart.png' });
  });

  test('Inventory Third product - Fill out customer details with valid customer information', async () => {
    const cartPage = new CartPage(page);
    await inventoryPage.addSecondElementToCart();
    await page.screenshot({ path: 'visual_comparison_data/inventory/addSecondElementToCart.png' });
    await inventoryPage.navigateToCart();
    await page.isVisible(locatorsCart.checkOutButtonText);
    await page.click(locatorsCart.checkOutButton);
    await checkoutPage.fillFirstName(locatorsCheckout.firstNameValue);
    await checkoutPage.fillLastName(locatorsCheckout.lastNameValue);
    await checkoutPage.fillPostalCode(locatorsCheckout.postalCodeValue);
    await checkoutPage.verifyInputValues(locatorsCheckout.firstNameValue, locatorsCheckout.lastNameValue, locatorsCheckout.postalCodeValue);
    await page.screenshot({ path: 'visual_comparison_data/your_information/validCustomerDetails.png' });
    await page.click(locatorsCheckout.continueButton)
    await page.screenshot({ path: 'visual_comparison_data/overview/validUserVerifyPurchase.png' });
  });
});