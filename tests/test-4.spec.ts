import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="title"]').click();
  // <span class="title" data-test="title">Your Cart</span>
  await page.locator('[data-test="cart-quantity-label"]').click();
  // <div class="cart_quantity_label" data-test="cart-quantity-label">QTY</div>
  
  //<div class="cart_desc_label" data-test="cart-desc-label">Description</div>
  await page.locator('#page_wrapper').click({
    button: 'right'
  });

  // <button class="btn btn_secondary back btn_medium" data-test="continue-shopping" id="continue-shopping" name="continue-shopping"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LmRhNGE3ZTVlZiwgMjAyMi8xMS8yMi0xMzo1MDowNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjEgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzQ4Q0IxMkFBRUZDMTFFREIwRThFMzc3OTlDRTMyNUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzQ4Q0IxMkJBRUZDMTFFREIwRThFMzc3OTlDRTMyNUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNDhDQjEyOEFFRkMxMUVEQjBFOEUzNzc5OUNFMzI1QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDNDhDQjEyOUFFRkMxMUVEQjBFOEUzNzc5OUNFMzI1QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgbFSzAAAAFGSURBVHjaYvz//z/DQAImhgEGow4gywHLD2zON8gPeN+9dk4/pQ5gJDURzty2or513awGGP/RnH2MdAsBdMurAlMbKY4DUAgQg2dsXV4vm+z4H4anb1nWQKxefHhALSfKAbS0nKADaG05XgfQw3KcDqCX5VgdQE/LQRilIELP50byWheSXYMmUrPo1ZBVuqAqrXABoyS8/fSBgXN90nl6lP/ryyc7GqtqH0ApCT99+ypArwqIj4v7A9a6ABj/DW3rZ9fTMgqkhMUfwHyPtSgGJTrkRAhKlLRMhMwNDQ0oLjRR0z3AyczGePjGOQcQ//D1sw5cLOwMJqo6B2kRHRgOoLcjsDqAno7A6QB6OQKvA+jhCIIOoLUjiHIALkeI8wp+1FVUP0GXJhm2ckI/z/89XZpkuBzRuWrWBKrWhqM9oxHpAIAAAwBV1hmIioz+GAAAAABJRU5ErkJggg==" class="back-image" alt="Go back">Continue Shopping</button>
  await page.locator('[data-test="continue-shopping"]').click();
  await page.locator('[data-test="secondary-header"]').click();
  await page.getByText('Continue ShoppingCheckout').click({
    button: 'right'
  });

  //<span class="title" data-test="title">Products</span>
});