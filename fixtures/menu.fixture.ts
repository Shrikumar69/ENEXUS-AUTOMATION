import { expect, type Locator, type Page } from '@playwright/test';

export type MenuSearchOptions = {
  timeoutMs?: number;
  exactMatch?: boolean;
};

export class MenuFixture {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async searchAndSelectMenuItem(menuName: string, options: MenuSearchOptions = {}): Promise<void> {
    const waitOptions = this.getWaitOptions(options.timeoutMs);

    await this.openMenuSection(waitOptions);

    const searchInput = this.findSearchTitleInput();
    await expect(searchInput).toBeVisible(waitOptions);
    await searchInput.click();
    await searchInput.fill(menuName);
    await searchInput.press('Enter').catch(() => undefined);

    const menuItem = this.findMenuResult(menuName, options.exactMatch ?? false);
    await expect(menuItem).toBeVisible(waitOptions);
    await menuItem.click();
  }

  private findMenuResult(menuName: string, exactMatch: boolean): Locator {
    const escaped = escapeRegExp(menuName);
    const regex = exactMatch ? new RegExp(`^\\s*${escaped}\\s*$`, 'i') : new RegExp(escaped, 'i');

    return this.page
      .locator([
        'a',
        'button',
        '[role="option"]',
        '[role="menuitem"]',
        'li',
        '[title]',
      ].join(', '))
      .filter({ hasText: regex })
      .first();
  }

  private findSearchTitleInput(): Locator {
    return this.page.locator('div.ep-search-box input[type="search"]').first();
  }

  private async openMenuSection(waitOptions?: { timeout: number }): Promise<void> {
    const menuButton = this.page.locator('li#Menu').first();
    await expect(menuButton).toBeVisible(waitOptions);
    await menuButton.click();
  }

  private getWaitOptions(timeoutMs?: number): { timeout: number } | undefined {
    if (typeof timeoutMs !== 'number') {
      return undefined;
    }

    return { timeout: timeoutMs };
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
