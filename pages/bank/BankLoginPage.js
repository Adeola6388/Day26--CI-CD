import { expect } from "@playwright/test";

export class BankLoginPage {
  constructor(page) {
    this.page = page;
    this.url = "https://mini-bank.testamplify.com/login";
    this.emailInput = page.getByLabel(/email/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.loginButton = page.getByRole("button", { name: /log in|login|sign in/i });
  }

  async goto() {
    await this.page.goto(this.url);
    await this.assertLoaded();
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/\/login/);
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async login({ email, password }) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    if (await this.loginButton.count()) {
      await this.loginButton.first().click();
    } else {
      throw new Error("Login button not found on the bank login page");
    }
  }
}
