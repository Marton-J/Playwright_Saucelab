import { expect } from 'playwright/test';
import { locatorsPurchase } from '../../locators/locatorsPurchase';
import { Page } from 'playwright';

export class PurchasePage {
    private page: Page;
    private locatorsPurchase = locatorsPurchase;
    
    constructor(page: Page) {
        this.page = page;
    }

    async purchaseProductSortByPrice() {
        await this.page.getByText(this.locatorsPurchase.sortByName).isVisible();
        await this.page.getByText(this.locatorsPurchase.sortByName).click();
        await this.page.locator(this.locatorsPurchase.sortDropdown).selectOption(this.locatorsPurchase.lowToHighPrice);
        const expectedPrices = ['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99'];
        const priceElements = await this.page.locator(this.locatorsPurchase.productPrices).allTextContents();
        expect(priceElements).toEqual(expectedPrices);
    }

    async purchaseProductSortByNameAZ() {
        await this.page.getByText(this.locatorsPurchase.sortByName).isVisible();
        await this.page.getByText(this.locatorsPurchase.sortByName).click();
        await this.page.locator('[data-test="product-sort-container"]').selectOption('az');
        const expectedPrices = ['$29.99', '$9.99', '$15.99', '$49.99', '$7.99', '$15.99'];    
        const priceElements = await this.page.locator(this.locatorsPurchase.productPrices).allTextContents();
        expect(priceElements).toEqual(expectedPrices);
    }

    async addLastElementToCart() {
        const elements = await this.page.locator('[data-test^="add-to-cart-"]').elementHandles();
        const dataTestAttributes: string[] = [];
        for (const element of elements) {
            const dataTest = await element.getAttribute('data-test');
            if (dataTest) {
                dataTestAttributes.push(dataTest);
            }
        }
        if (elements.length > 0) {
            await elements[elements.length - 1].click();
        } else {
            throw new Error('No add-to-cart buttons found');
        }
    }

    async addSecondElementToCart() {
        const elements = await this.page.locator('[data-test^="add-to-cart-"]').elementHandles();
        const dataTestAttributes: string[] = [];
        for (const element of elements) {
          const dataTest = await element.getAttribute('data-test');
          if (dataTest) {
            dataTestAttributes.push(dataTest);
          }
        }
        if (elements.length > 0) {
          await elements[1].click();
        } else {
          throw new Error('No add-to-cart buttons found');
        }
    }


}