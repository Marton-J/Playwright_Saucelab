export class SauceLabPage {
  baseUrl: string;

  constructor() {
    this.baseUrl = 'https://www.saucedemo.com';
  }

  async getLoginPage(request: any) {
    return await request.get(`${this.baseUrl}/`);
  }

  async getInventoryPage(request: any) {
    return await request.get(`${this.baseUrl}/?/inventory.html`);
  }

  async getCartPage(request: any) {
    return await request.get(`${this.baseUrl}/?/cart.html`);
  }
}
