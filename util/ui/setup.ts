import { chromium, expect, Page } from '@playwright/test';
import { LoginPage } from '../../pageObjects/ui/loginPage';
import { InventoryPage } from '../../pageObjects/ui/inventoryPage';
import { CartPage } from '../../pageObjects/ui/cartPage';
import { CheckoutPage } from '../../pageObjects/ui/checkoutPage';
import { CompletePage } from '../../pageObjects/ui/completePage';
import { locatorsInventory } from '../../locators/ui/locatorsInventory';
import * as dotenv from 'dotenv';

dotenv.config();

let browser: any;
let page: Page;
let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let checkoutPage: CheckoutPage;
let completePage: CompletePage;
let cartPage: CartPage;

export async function setup() {
  browser = await chromium.launch();
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  checkoutPage = new CheckoutPage(page);
  completePage = new CompletePage(page);
  cartPage = new CartPage(page);
  await loginPage.performLogin();
  await page.screenshot({ path: 'visualComparisonImages/01_login.png' });
  await loginPage.login(process.env.USERNAME ?? '', process.env.PASSWORD ?? '');
  const currentUrl = await page.url();
  expect(currentUrl).toBe(locatorsInventory.inventoryPageTile);
}

export async function teardown() {
  await browser.close();
}

export { page, loginPage, inventoryPage, checkoutPage, completePage, cartPage };