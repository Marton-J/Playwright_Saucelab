import { test, expect } from '@playwright/test';
import { SauceLabPage } from '../../pageObjects/api/sauceLab';
import { logResponseStatus } from '../../util/api/apiLogRequests';


test.describe('Sauce Labs Smoke Tests', {
  tag: '@Sauce_Labs_API_Smoke_Tests'
}, () => {
  let sauceLabPage: SauceLabPage;

  test.beforeAll(() => {
    sauceLabPage = new SauceLabPage();
    console.log('\nTestBaseUrl:', `${sauceLabPage.baseUrl}\n`);
  });

  test('Verify Login page', async ({ request }) => {
    const response = await sauceLabPage.getLoginPage(request);
    logResponseStatus(response);
    expect(response.status()).toBe(200);
    const responseBody = await response.text();
    expect(responseBody).toContain('<title>Swag Labs</title>');
    expect(responseBody).toContain('<meta name="description" content="Sauce Labs Swag Labs app"/>');
    expect(responseBody).toContain('<link rel="icon" href="/favicon.ico"/>');
    expect(responseBody).toContain('<div id="root"></div>');
  });

  test('Verify inventory page', async ({ request }) => {
    const response = await sauceLabPage.getInventoryPage(request);
    logResponseStatus(response);
    expect(response.status()).toBe(200);
    const responseBody = await response.text();
    expect(responseBody).toContain('<title>Swag Labs</title>');
    expect(responseBody).toContain('<meta name="description" content="Sauce Labs Swag Labs app"/>');
    expect(responseBody).toContain('<link rel="icon" href="/favicon.ico"/>');
    expect(responseBody).toContain('<div id="root"></div>');
  });

  test('Verify cart page', async ({ request }) => {
    const response = await sauceLabPage.getCartPage(request);
    logResponseStatus(response);
    expect(response.status()).toBe(200);
    const responseBody = await response.text();
    expect(responseBody).toContain('<title>Swag Labs</title>');
    expect(responseBody).toContain('<meta name="description" content="Sauce Labs Swag Labs app"/>');
    expect(responseBody).toContain('<link rel="icon" href="/favicon.ico"/>');
    expect(responseBody).toContain('<div id="root"></div>');
  });
});