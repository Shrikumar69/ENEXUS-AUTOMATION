import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Use selector fallbacks to make the page object resilient to small UI changes.
    this.usernameInput = page
      .locator(
        [
          'input[name="username"]',
          'input[formcontrolname="username"]',
          'input[id*="user"]',
          'input[type="email"]',
          'input[autocomplete="username"]',
        ].join(', '),
      )
      .first();

    this.passwordInput = page
      .locator(
        [
          'input[name="password"]',
          'input[formcontrolname="password"]',
          'input[id*="pass"]',
          'input[type="password"]',
          'input[autocomplete="current-password"]',
        ].join(', '),
      )
      .first();

    this.loginButton = page
      .locator(
        [
          'button[type="submit"]',
          'input[type="submit"]',
          'button:has-text("Login")',
          'button:has-text("Sign in")',
        ].join(', '),
      )
      .first();
  }

  async goto(url: string): Promise<void> {
    try {
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    } catch {
      // Some environments delay full DOM readiness; proceed once main document is committed.
      await this.page.goto(url, { waitUntil: 'commit' });
      await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);
    }
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccess(): Promise<void> {
    await this.page.waitForURL((url) => !url.href.includes('/login'));
    await expect(this.page).not.toHaveURL(/\/login/i);
    await expect(this.page.getByRole('heading', { name: /EPICOR\s*-\s*eNexus/i })).toBeVisible();
    await expect(this.page.locator('#Menu').first()).toBeVisible();
  }
}
