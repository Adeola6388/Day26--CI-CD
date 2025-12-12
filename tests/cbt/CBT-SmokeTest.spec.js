import {test, expect} from '@playwright/test';
import {ShopLandingPage} from '../../pages/shop/ShopLandingPage.js';
import {BankLoginPage} from '../../pages/bank/BankLoginPage.js';
import {DashboardPage} from '../../pages/bank/DashboardPage.js';
import {bankUsers} from '../../test-data/credentials.js';

test.describe('Cross Browser Testing Smoke Test, same scenario on multiple browsers', () => {

    test('✅Shoplanding open and Products page loads', async ({page}, testInfo) => {
        console.log(`Running test: on ${testInfo.project.name}`);
        const shop = new ShopLandingPage(page);
        await shop.goto();
        await shop.assertLoaded();
        await shop.openProducts();
        await expect(page).toHaveURL(/.*products/);
    });

    test('✅Banking App Login and Dashboard Load', async ({page}, testInfo) => {
        console.log(`Running test on: ${testInfo.project.name}`);
        const login = new BankLoginPage(page);
        await login.goto();
        await login.login({email: bankUsers.email, password: bankUsers.password});

        const dashboard = new DashboardPage(page);
        await dashboard.assertLoaded();
    });
});