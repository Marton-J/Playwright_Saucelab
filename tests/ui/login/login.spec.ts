import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../../../pageObjects/ui/loginPage';
import { locatorsInventory } from '../../../locators/ui/locatorsInventory';
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
    await page.screenshot({ path: 'visual_comparison_data/login/login.png' });
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test('The standard_user should be able to login.', async () => {
    await loginPage.login(process.env.USERNAME ?? '', process.env.PASSWORD ?? '');
    const currentUrl = await page.url();
    expect(currentUrl).toBe(locatorsInventory.inventoryPageTile);
    await page.screenshot({ path: 'visual_comparison_data/inventory/standard_user.png' });
  });

  test('The locked_out_user should not be able to login.', async () => {
    await loginPage.login(process.env.LOCKED_USERNAME ?? '', process.env.PASSWORD ?? '');
    await loginPage.checkError();
    await page.screenshot({ path: 'visual_comparison_data/login/locked_out_user.png' });
  });
});

