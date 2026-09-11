import { expect, type Locator, type Page } from '@playwright/test';

export type CreatePlatformInput = {
	platformId: string;
	name: string;
	description?: string;
	active?: boolean;
};

export class PlatformPage {
	private readonly addNewPlatformButton: Locator;
	private readonly addNewButton: Locator;
	private readonly saveButton: Locator;
	private readonly refreshButton: Locator;
	private readonly createNewPlatformTitle: Locator;
	private readonly platformIdInput: Locator;
	private readonly platformNameInput: Locator;
	private readonly platformDescriptionInput: Locator;
	private readonly platformActiveCheckbox: Locator;

	constructor(page: Page) {
		this.addNewPlatformButton = page.locator('i[title="Add New Platform"]').first();
		this.addNewButton = page.locator('i[title="Add New"]').first();
		this.saveButton = page.locator('i[title="Save"]').first();
		this.refreshButton = page.locator('i[title="Refresh"]').first();
		this.createNewPlatformTitle = page.locator('h1#ep-view-title[title="Create New Platform"]').first();
		this.platformIdInput = page.locator('#platformIdSearch input[type="text"]').first();
		this.platformNameInput = page.locator('#platformName input[type="text"]').first();
		this.platformDescriptionInput = page.locator('#platformDescription textarea').first();
		this.platformActiveCheckbox = page.locator('#platformActive input[type="checkbox"]').first();
	}

	async clickAddNewPlatform(): Promise<void> {
		await expect(this.addNewPlatformButton).toBeVisible();
		await this.addNewPlatformButton.click();
	}

	async Createplatform(): Promise<void> {
		await this.clickAddNewPlatform();
	}

	async expectCreateNewPlatformLoaded(): Promise<void> {
		await expect(this.createNewPlatformTitle).toBeVisible();
	}

	async fillPlatformId(value: string): Promise<void> {
		await expect(this.platformIdInput).toBeVisible();
		await this.platformIdInput.fill(value);
	}

	async fillPlatformName(value: string): Promise<void> {
		await expect(this.platformNameInput).toBeVisible();
		await this.platformNameInput.fill(value);
	}

	async fillPlatformDescription(value: string): Promise<void> {
		await expect(this.platformDescriptionInput).toBeVisible();
		await this.platformDescriptionInput.fill(value);
	}

	async setPlatformActive(checked: boolean): Promise<void> {
		await this.setCheckbox(this.platformActiveCheckbox, checked);
	}

	async createPlatform(input: CreatePlatformInput): Promise<void> {
		await this.fillPlatformId(input.platformId);
		await this.fillPlatformName(input.name);

		if (typeof input.description === 'string') {
			await this.fillPlatformDescription(input.description);
		}

		if (typeof input.active === 'boolean') {
			await this.setPlatformActive(input.active);
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

	async clickAddNew(): Promise<void> {
		await expect(this.addNewButton).toBeVisible();
		await this.addNewButton.click();
	}

	private async setCheckbox(checkbox: Locator, checked: boolean): Promise<void> {
		await expect(checkbox).toBeVisible();
		const isChecked = await checkbox.isChecked();

		if (isChecked !== checked) {
			await checkbox.click();
		}
	}
}
