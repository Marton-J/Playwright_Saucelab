import { expect } from 'playwright/test';
import { locatorsCart } from '../../locators/ui/locatorsCart';
import { locatorsCheckout } from '../../locators/ui/locatorsCheckout';
import { Page } from 'playwright';

export class CartPage {
    private page: Page;
    private locatorsCart = locatorsCart;
    readonly badgeElementLocator: string;

    constructor(page: Page) {
        this.page = page;
        this.badgeElementLocator = locatorsCart.badgeElement;
    }

    async verifyPageTitle() {
        const pageTitle = await this.page.locator(this.locatorsCart.pageTitle).textContent();
        expect(pageTitle).toContain(this.locatorsCart.pageTitleText);
        const pageTitleVisible = await this.page.locator(this.locatorsCart.pageTitle).isVisible();
        expect(pageTitleVisible).toBeTruthy();
    }

    async verifyCartQuantityLabel() {
        const cartQuantityLabel = await this.page.locator(this.locatorsCart.cartQuantityLabel).textContent();
        expect(cartQuantityLabel).toContain(this.locatorsCart.cartQuantityLabelText);
        const cartQuantityLabelVisible = await this.page.locator(this.locatorsCart.cartQuantityLabel).isVisible();
        expect(cartQuantityLabelVisible).toBeTruthy();
    }

    async verifyCartDescLabel() {
        const cartDescLabel = await this.page.locator(this.locatorsCart.cartDescLabel).textContent();
        expect(cartDescLabel).toContain(this.locatorsCart.cartDescLabelText);
        const cartDescLabelVisible = await this.page.locator(this.locatorsCart.cartDescLabel).isVisible();
        expect(cartDescLabelVisible).toBeTruthy();
    }

    async verifyRemoveButton() {
        const removeButton = await this.page.locator(this.locatorsCart.removeButton).textContent();
        expect(removeButton).toContain(this.locatorsCart.removeButtonText);
        const removeButtonVisible = await this.page.locator(this.locatorsCart.removeButton).isVisible();
        expect(removeButtonVisible).toBeTruthy();
    }

    async verifyContinueShoppingButton() {
        const continueShoppingButton = await this.page.locator(this.locatorsCart.continueShoppingButton).textContent();
        expect(continueShoppingButton).toContain(this.locatorsCart.continueShoppingButtonText);
        const continueShoppingButtonVisible = await this.page.locator(this.locatorsCart.continueShoppingButton).isVisible();
        expect(continueShoppingButtonVisible).toBeTruthy();
    }

    async verifyCartPage() {
        await this.verifyPageTitle();
        await this.verifyCartQuantityLabel();
        await this.verifyCartDescLabel();
        await this.verifyRemoveButton();
        await this.verifyContinueShoppingButton();
    }

    async getCartItemNames(): Promise<string[]> {
        const itemNameLocator = this.page.locator('.inventory_item_name');
        const itemCount = await itemNameLocator.count();
        const itemNames: string[] = [];
        for (let i = 0; i < itemCount; i++) {
            const itemName = await itemNameLocator.nth(i).textContent();
            if (itemName) {
                itemNames.push(itemName.trim());
            }
        }
        return itemNames;
    }

    async verifyBadgeElement(expectedText: string) {
        const badgeElement = this.page.locator(this.badgeElementLocator);
        await expect(badgeElement).toBeVisible();
        await expect(badgeElement).toHaveText(expectedText);
      }
}