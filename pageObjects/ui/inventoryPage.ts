import { expect } from 'playwright/test';
import { locatorsInventory } from '../../locators/ui/locatorsInventory';
import { Page } from 'playwright';

export class InventoryPage {
    private page: Page;
    private locatorsInventory = locatorsInventory;
    readonly badgeElementLocator: string;

    constructor(page: Page) {
        this.page = page;
        this.badgeElementLocator = locatorsInventory.badgeElement;
    }

    // The following method is used in the test file for sorting the products by low to high price
    async inventoryProductSortByPrice() {
        await this.page.locator(this.locatorsInventory.sortDropdown).selectOption(this.locatorsInventory.lowToHighPrice);
        const priceElements = await this.page.locator(this.locatorsInventory.productPrices).allTextContents();
        const prices = priceElements.map(price => parseFloat(price.replace('$', '')));
        //console.log(prices);
        const isSorted = prices.every((price, index, array) => index === 0 || array[index - 1] <= price);
        if (!isSorted) {
            console.log('Items are not sorted by price from low to highest');
        }
        
        expect(isSorted).toBe(true);
    }

    // The following method is used in the test file for sorting the products by alphabetical order
    async inventoryProductSortByNameAZ() {
        try {
            await this.page.locator(this.locatorsInventory.sortDropdown).selectOption(this.locatorsInventory.alphabeticalSorted);
        
            const inventoryItems = await this.page.locator(this.locatorsInventory.productNames).elementHandles();
            const itemNames: string[] = [];
            for (const item of inventoryItems) {
                const itemName = await item.textContent();
                if (itemName) {
                    itemNames.push(itemName);
                }
            }
            const isSorted = itemNames.every((name, index, array) => index === 0 || array[index - 1].localeCompare(name) <= 0);
            if (!isSorted) {
                console.log('Items are not sorted by name from A to Z');
            }

            expect(isSorted).toBe(true);
        } catch (error) {
            console.error('Error during sorting by name:', error);
            throw error; // Re-throw the error after logging it
        }
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

    // Method to get inventory item names
    async getInventoryItemNames(): Promise<string[]> {
        const inventoryItemNames: string[] = [];
        const removeButtons = await this.page.$$(this.locatorsInventory.wildcardRemoveButton);
        for (const button of removeButtons) {
            const parentElement = await button.$(this.locatorsInventory.inventoryDescription);
            if (parentElement) {
                const itemNameElement = await parentElement.$(this.locatorsInventory.productNames);
                if (itemNameElement) {
                    const itemName = await itemNameElement.textContent();
                    if (itemName) {
                        inventoryItemNames.push(itemName);
                    }
                }
            }
        }
        return inventoryItemNames;
    }

    async verifyBadgeElement(expectedText: string) {
        const badgeElement = this.page.locator(this.badgeElementLocator);
        await expect(badgeElement).toBeVisible();
        await expect(badgeElement).toHaveText(expectedText);
      }
}