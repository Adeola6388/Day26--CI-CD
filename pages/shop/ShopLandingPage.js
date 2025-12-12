import { expect } from "@playwright/test";

export class ShopLandingPage {
  constructor(page) {
    this.page = page;
    this.url = "https://mini-shop.testamplify.com/";
    this.heroHeading = page.getByRole("heading", { name: /mini shop/i });
    this.productsLink = page.getByRole("link", { name: /products/i });
    this.shopNowLink = page.getByRole("link", { name: /shop now/i });
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async assertLoaded() {
    await expect(this.page).toHaveTitle(/Minishop/i);
    await expect(this.heroHeading).toBeVisible();
  }

  async openProducts() {
    if (await this.productsLink.count()) {
      await this.productsLink.first().click();
      return;
    }

    if (await this.shopNowLink.count()) {
      await this.shopNowLink.first().click();
      return;
    }

    throw new Error("Products navigation link not found on the shop landing page");
  }
}
