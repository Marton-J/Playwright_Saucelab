import { expect } from 'playwright/test';
import { locatorsInventory } from '../../locators/ui/locatorsInventory';
import { Page } from 'playwright';

export class InventoryPage {
    private page: Page;
    private locatorsInventory = locatorsInventory;

    constructor(page: Page) {
        this.page = page;
    }

    // The following method is used in the test file for sorting the products by low to high price
    async inventoryProductSortByPrice() {
        await this.page.getByText(this.locatorsInventory.sortByName).isVisible();
        await this.page.getByText(this.locatorsInventory.sortByName).click();
        await this.page.locator(this.locatorsInventory.sortDropdown).selectOption(this.locatorsInventory.lowToHighPrice);
        const expectedPrices = ['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99'];
        const priceElements = await this.page.locator(this.locatorsInventory.productPrices).allTextContents();
        expect(priceElements).toEqual(expectedPrices);
    }

    // The following method is used in the test file for sorting the products by alphabetical order
    async inventoryProductSortByNameAZ() {
        await this.page.getByText(this.locatorsInventory.sortByName).isVisible();
        await this.page.getByText(this.locatorsInventory.sortByName).click();
        await this.page.locator(this.locatorsInventory.sortDropdown).selectOption(this.locatorsInventory.alphabeticalSorted);
        const expectedPrices = ['$29.99', '$9.99', '$15.99', '$49.99', '$7.99', '$15.99'];
        const priceElements = await this.page.locator(this.locatorsInventory.productPrices).allTextContents();
        expect(priceElements).toEqual(expectedPrices);
    }

    // The following method is used in the test file for adding the last element to the cart
    async addElementToCart(position: 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'last') {
        const elements = await this.page.locator(this.locatorsInventory.addToCart).elementHandles();
        const dataTestAttributes: string[] = [];
        for (const element of elements) {
            const dataTest = await element.getAttribute(this.locatorsInventory.getDataAttribute);
            if (dataTest) {
                dataTestAttributes.push(dataTest);
            }
        }

        if (elements.length > 0) {
            let index: number;
            switch (position) {
                case 'first':
                    index = 0;
                    break;
                case 'second':
                    index = 1;
                    break;
                case 'third':
                    index = 2;
                    break;
                case 'fourth':
                    index = 3;
                    break;
                case 'fifth':
                    index = 4;
                    break;
                case 'last':
                    index = elements.length - 1;
                    break;
                default:
                    throw new Error(`Invalid position: ${position}`);
            }

            if (index >= 0 && index < elements.length) {
                await elements[index].click();
            } else {
                throw new Error(`Index ${index} is out of bounds for add-to-cart buttons`);
            }
        } else {
            throw new Error('No add-to-cart buttons found');
        }
    }

    // The following methods are used in the test file for identifying the elements to add to the cart
    async addFirstElementToCart() {
        await this.addElementToCart('first');
    }

    async addSecondElementToCart() {
        await this.addElementToCart('second');
    }

    async addThirdElementToCart() {
        await this.addElementToCart('third');
    }

    async addFourthElementToCart() {
        await this.addElementToCart('fourth');
    }

    async addFifthElementToCart() {
        await this.addElementToCart('fifth');
    }

    async addLastElementToCart() {
        await this.addElementToCart('last');
    }

    async navigateToCart() {
        await this.page.locator(this.locatorsInventory.cartLink).click();
    }
}