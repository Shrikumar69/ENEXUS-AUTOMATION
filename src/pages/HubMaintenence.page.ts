import { expect, type Locator, type Page } from '@playwright/test';

export type CreateHubInput = {
  hubId: string;
  region: string;
  baseUrl: string;
  countryList?: string;
  production?: boolean;
  central?: boolean;
};

export class HubMaintenencePage {
  private readonly addNewHubButton: Locator;
  private readonly saveButton: Locator;
  private readonly refreshButton: Locator;

  private readonly hubIdInput: Locator;
  private readonly regionInput: Locator;
  private readonly baseUrlInput: Locator;
  private readonly countryListInput: Locator;

  private readonly productionCheckbox: Locator;
  private readonly centralCheckbox: Locator;

  constructor(page: Page) {
    this.addNewHubButton = page.locator('i[title="Add New Hub"]').first();
    this.saveButton = page.locator('i[title="Save"]').first();
    this.refreshButton = page.locator('i[title="Refresh"]').first();

    this.hubIdInput = page.locator('#hubIdSearch input[type="text"]').first();
    this.regionInput = page.locator('#hubRegion input[type="text"]').first();
    this.baseUrlInput = page.locator('#hubBaseUrl input[type="text"]').first();
    this.countryListInput = page.locator('#hubCountryList input[type="text"]').first();

    this.productionCheckbox = page.locator('#hubIsProduction input[type="checkbox"]').first();
    this.centralCheckbox = page.locator('#hubIsCentral input[type="checkbox"]').first();
  }

  async clickAddNewHub(): Promise<void> {
    await expect(this.addNewHubButton).toBeVisible();
    await this.addNewHubButton.click();
  }

  async fillHubId(value: string): Promise<void> {
    await expect(this.hubIdInput).toBeVisible();
    await this.hubIdInput.fill(value);
  }

  async fillRegion(value: string): Promise<void> {
    await expect(this.regionInput).toBeVisible();
    await this.regionInput.fill(value);
  }

  async fillBaseUrl(value: string): Promise<void> {
    await expect(this.baseUrlInput).toBeVisible();
    await this.baseUrlInput.fill(value);
  }

  async fillCountryList(value: string): Promise<void> {
    await expect(this.countryListInput).toBeVisible();
    await this.countryListInput.fill(value);
  }

  async setProduction(checked: boolean): Promise<void> {
    await this.setCheckbox(this.productionCheckbox, checked);
  }

  async setCentral(checked: boolean): Promise<void> {
    await this.setCheckbox(this.centralCheckbox, checked);
  }

  async createHub(input: CreateHubInput): Promise<void> {
    await this.fillHubId(input.hubId);
    await this.fillRegion(input.region);
    await this.fillBaseUrl(input.baseUrl);

    if (typeof input.countryList === 'string') {
      await this.fillCountryList(input.countryList);
    }

    if (typeof input.production === 'boolean') {
      await this.setProduction(input.production);
    }

    if (typeof input.central === 'boolean') {
      await this.setCentral(input.central);
    }
  }

  async clickSave(): Promise<void> {
    await expect(this.saveButton).toBeVisible();
    await this.saveButton.click();
  }

  async clickRefresh(): Promise<void> {
    await expect(this.refreshButton).toBeVisible();
    await this.refreshButton.click();
  }

  private async setCheckbox(checkbox: Locator, checked: boolean): Promise<void> {
    await expect(checkbox).toBeVisible();
    const isChecked = await checkbox.isChecked();

    if (isChecked !== checked) {
      await checkbox.click();
    }
  }
}
