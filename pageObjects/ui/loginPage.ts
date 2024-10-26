import { locatorsLogin } from '../../locators/locatorsLogin';
import { expect } from '@playwright/test';
import { Page } from 'playwright';

export class LoginPage {
    private page: Page;
    private locatorsLogin = locatorsLogin;

    constructor(page: Page) {
        this.page = page;
    }

    async performLogin() {
        await this.page.goto('/');
        const currentUrl = await this.page.url();
        expect(currentUrl).toBe(this.locatorsLogin.urlVerification);
        await this.checkLoginPageElements();
        await this.verifyUsernames();
        await this.verifyPassword();
    }

    async checkLoginPageElements() {
        await this.page.locator(this.locatorsLogin.swagLabsText).isVisible();
        await this.page.locator(this.locatorsLogin.loginButton).isVisible();
        await this.page.locator(this.locatorsLogin.acceptedUsernamesHeading).isVisible();
        await this.page.locator(this.locatorsLogin.passwordForAllUsersHeading).isVisible();
        await this.page.locator(this.locatorsLogin.loginCredentials).isVisible();
        await this.page.locator(this.locatorsLogin.loginPassword).isVisible();
        await this.page.locator(this.locatorsLogin.loginContainer).isVisible();
    }

    async login(username: string, password: string) {
        await this.page.locator(this.locatorsLogin.usernameField).isVisible();
        await this.page.locator(this.locatorsLogin.usernameField).click();
        await this.page.locator(this.locatorsLogin.usernameField).fill(username);
        await this.page.locator(this.locatorsLogin.passwordField).isVisible();
        await this.page.locator(this.locatorsLogin.passwordField).click();
        await this.page.locator(this.locatorsLogin.passwordField).fill(password);
        await this.page.locator(this.locatorsLogin.loginButton).isVisible();
        await this.page.locator(this.locatorsLogin.loginButton).click();
    }

    async checkError() {
        await this.page.locator(this.locatorsLogin.error).isVisible();
        const errorMessage = await this.page.locator(this.locatorsLogin.errorMessage).innerText();
        expect(errorMessage).toContain(this.locatorsLogin.errorMessageText);
        await this.page.locator(this.locatorsLogin.errorIcon).isVisible();
    }

    async verifyUsernames() {
        const credentialsText = await this.page.locator(this.locatorsLogin.loginCredentials).innerText();
        const expectedUsernames = [
            'Accepted usernames are:',
            'standard_user',
            'locked_out_user',
            'problem_user',
            'performance_glitch_user',
            'error_user',
            'visual_user',
            ''
        ];

        const actualUsernames = credentialsText.split('\n').map(username => username.trim());

        expect(actualUsernames).toEqual(expectedUsernames);
    }

    async verifyPassword() {
        const passwordText = await this.page.locator(this.locatorsLogin.loginPassword).innerText();
        const expectedPassword = process.env.PASSWORD ?? '';

        expect(passwordText).toContain(expectedPassword);
    }
}