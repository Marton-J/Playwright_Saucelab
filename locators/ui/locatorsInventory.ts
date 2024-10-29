import { InventoryPage } from "../../pageObjects/ui/inventoryPage";

export const locatorsInventory = {
    inventoryPageTile: 'https://www.saucedemo.com/inventory.html',
    sortDropdown: '[data-test="product-sort-container"]',
    productPrices: '.inventory_item_price',
    productNames: '.inventory_item_name',
    sortByName: 'Name (A to Z)Name (A to Z)',
    sortByPrice: 'Price (low to high)',
    lowToHighPrice: 'lohi',
    alphabeticalSorted: 'az',
    addToCart: '[data-test^="add-to-cart-"]',
    getDataAttribute: 'data-test',
    cartLink: '[data-test="shopping-cart-link"]',
    wildcardRemoveButton: 'button[id^="remove-sauce-labs-"]',
    inventoryDescription: 'xpath=ancestor::*[@class="inventory_item_description"]',
    badgeElement: '.shopping_cart_badge',
};