import { test as base, expect, type Page } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { getLoginCredentials, getLoginUrl } from '../utils/env';

type SessionFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<SessionFixtures>({
  authenticatedPage: async ({ page }, use, testInfo) => {
    const credentials = getLoginCredentials();

    if (!credentials) {
      throw new Error(
        'Missing ENEXUS_USERNAME or ENEXUS_PASSWORD. Create .env from .env.example and set valid credentials.',
      );
    }

    const loginPage = new LoginPage(page);
    await loginPage.goto(getLoginUrl());
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.expectLoginSuccess();

    await use(page);

    // Best-effort logout to keep sessions isolated across tests.
    if (testInfo.status !== 'skipped') {
      await logout(page);
    }
  },
});

export { expect };

async function logout(page: Page): Promise<void> {
  const profileMenu = page
    .locator(
      [
        '[aria-label*="profile"]',
        '[aria-label*="account"]',
        '[class*="profile"]',
        '[class*="avatar"]',
      ].join(', '),
    )
    .first();

  const logoutAction = page
    .locator(
      [
        'text=Logout',
        'text=Log out',
        'a:has-text("Logout")',
        'button:has-text("Logout")',
      ].join(', '),
    )
    .first();

  if (await profileMenu.isVisible().catch(() => false)) {
    await profileMenu.click();
  }

  if (await logoutAction.isVisible().catch(() => false)) {
    await logoutAction.click();
    await page.waitForURL(/\/login/i, { timeout: 15000 }).catch(() => undefined);
  }
}
