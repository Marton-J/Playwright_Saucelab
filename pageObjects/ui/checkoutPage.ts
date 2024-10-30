import { expect } from '@playwright/test';
import { locatorsCheckout } from '../../locators/ui/locatorsCheckout';
import { Page } from 'playwright';

const fs = require('fs');

export class CheckoutPage {
  private readonly page: Page;
  private readonly locatorsCheckout = locatorsCheckout;
  readonly badgeElementLocator: string;
  private readonly continueButton: string;

  constructor(page: Page) {
    this.page = page;
    this.badgeElementLocator = locatorsCheckout.badgeElement;
    this.continueButton = locatorsCheckout.continueButton;
  }

  async verifyAppLogo() {
    const appLogo = this.page.locator(this.locatorsCheckout.appLogo);
    await expect(appLogo).toBeVisible();
    await expect(appLogo).toHaveText(this.locatorsCheckout.appLogoText);
  }

  async verifyTitle() {
    const title = this.page.locator(this.locatorsCheckout.title);
    await expect(title).toBeVisible();
    await expect(title).toHaveText(this.locatorsCheckout.titleText);
  }

  async verifyFirstNameInput() {
    const firstNameInput = this.page.locator(this.locatorsCheckout.firstNameInput);
    await expect(firstNameInput).toBeVisible();
    await expect(firstNameInput).toHaveAttribute(this.locatorsCheckout.attributePlaceholder, this.locatorsCheckout.firstNamePlaceholder);
  }

  async verifyLastNameInput() {
    const lastNameInput = this.page.locator(this.locatorsCheckout.lastNameInput);
    await expect(lastNameInput).toBeVisible();
    await expect(lastNameInput).toHaveAttribute(this.locatorsCheckout.attributePlaceholder, this.locatorsCheckout.lastNamePlaceholder);
  }

  async verifyPostalCodeInput() {
    const postalCodeInput = this.page.locator(this.locatorsCheckout.postalCodeInput);
    await expect(postalCodeInput).toBeVisible();
    await expect(postalCodeInput).toHaveAttribute(this.locatorsCheckout.attributePlaceholder, this.locatorsCheckout.postalCodePlaceholder);
  }

  async verifyCancelButton() {
    const cancelButton = this.page.locator(this.locatorsCheckout.cancelButton);
    await expect(cancelButton).toBeVisible();
    await expect(cancelButton).toHaveText(this.locatorsCheckout.cancelButtonText);
  }

  async verifyContinueButton() {
    const continueButton = this.page.locator(this.locatorsCheckout.continueButton);
    await expect(continueButton).toBeVisible();
    await expect(continueButton).toHaveText(this.locatorsCheckout.continueButtonText);
  }

  async verifyBadgeElement(expectedText: string) {
    const badgeElement = this.page.locator(this.badgeElementLocator);
    await expect(badgeElement).toBeVisible();
    await expect(badgeElement).toHaveText(expectedText);
  }

  async cancelFromCheckoutToCart() {
    await this.page.click(locatorsCheckout.cancelButton);
  }

  async fillFirstName(firstName: string) {
    await this.page.fill(this.locatorsCheckout.firstNameInput, firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.fill(this.locatorsCheckout.lastNameInput, lastName);
  }

  async fillPostalCode(postalCode: string) {
    await this.page.fill(this.locatorsCheckout.postalCodeInput, postalCode);
  }

  async verifyInputValues(firstName: string, lastName: string, postalCode: string) {
    expect(await this.page.inputValue(this.locatorsCheckout.firstNameInput)).toBe(firstName);
    expect(await this.page.inputValue(this.locatorsCheckout.lastNameInput)).toBe(lastName);
    expect(await this.page.inputValue(this.locatorsCheckout.postalCodeInput)).toBe(postalCode);
  }

  async clickContinueButton() {
    await this.page.click(this.continueButton);
  }

  async takeScreenshotIfNotExists(page, snapshotPath, screenshotPath) {
    if (!fs.existsSync(snapshotPath)) {
      await page.screenshot({ path: screenshotPath });
    }
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot(screenshotPath);
  }
}

export default CheckoutPage;