import { expect } from "@playwright/test";

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.url = "https://mini-bank.testamplify.com/dashboard";
    this.main = page.getByRole("main");
    this.heading = page.getByRole("heading", { name: /overview/i });
    this.recentTransactions = page.getByRole("heading", { name: /recent transactions/i });
  }

  async goto() {
    await this.page.goto(this.url);
    await this.assertLoaded();
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/\/dashboard/);
    await expect(this.main).toBeVisible();
    await expect(this.heading).toBeVisible();
    await expect(this.recentTransactions).toBeVisible();
  }
}
