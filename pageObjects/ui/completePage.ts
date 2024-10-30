import { Page } from 'playwright';
import { expect } from 'playwright/test';

class CompletePage {
  constructor(private readonly page: Page) {}

  async verifyCompletePage(locatorsComplete: any) {
    await this.page.locator(locatorsComplete.title).isVisible();
    const completeTitle = await this.page.locator(locatorsComplete.title).innerText();
    expect(completeTitle).toBe(locatorsComplete.expectedTexts.completeTitle);

    await this.page.locator(locatorsComplete.completeHeader).isVisible();
    const completeHeader = await this.page.locator(locatorsComplete.completeHeader).innerText();
    expect(completeHeader).toBe(locatorsComplete.expectedTexts.completeHeader);

    await this.page.locator(locatorsComplete.completeText).isVisible();
    const completeHeaderText = await this.page.locator(locatorsComplete.completeText).innerText();
    expect(completeHeaderText).toContain(locatorsComplete.expectedTexts.completeHeaderText);

    await this.page.locator(locatorsComplete.title).isVisible();
    await this.page.getByText(locatorsComplete.swagLabsText).isVisible();
  }
}

export { CompletePage };