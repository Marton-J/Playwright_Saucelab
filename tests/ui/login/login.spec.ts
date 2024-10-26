import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../../../pageObjects/ui/loginPage';
import { locatorsPurchase } from '../../../locators/locatorsPurchase';
import * as dotenv from 'dotenv';

dotenv.config();

let browser;
let page;
let loginPage: LoginPage;

test.describe('Purchase product flow standard_user', {
  tag: '@UI_Test_Login_Flow',
}, () => {
  test.beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.performLogin();
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test('The standard_user should be able to login.', async () => {
    await loginPage.login(process.env.USERNAME ?? '', process.env.PASSWORD ?? '');
    const currentUrl = await page.url();
    expect(currentUrl).toBe(locatorsPurchase.purchasePageTile);
  });

  test('The locked_out_user should not be able to login.', async () => {
    await loginPage.login(process.env.LOCKED_USERNAME ?? '', process.env.PASSWORD ?? '');
    await loginPage.checkError();
  });
});