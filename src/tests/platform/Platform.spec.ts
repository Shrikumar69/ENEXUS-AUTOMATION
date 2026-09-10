import { test, expect } from '../../../fixtures/session.fixture';
import { MenuFixture } from '../../../fixtures/menu.fixture';
import { PlatformPage } from '../../pages/platform/platform.page';
import { waitForGlobalStep } from '../../../utils/wait';

test.describe('Platform Maintenance', () => {
	test('user can create a new platform', async ({ authenticatedPage }) => {
		await expect(authenticatedPage).not.toHaveURL(/\/login/i);
		await expect(authenticatedPage).toHaveTitle('ENexus');

		const menu = new MenuFixture(authenticatedPage);
		await menu.searchAndSelectMenuItem('Platform');
		await waitForGlobalStep(authenticatedPage);

		await expect(
			authenticatedPage.locator('h1#ep-view-title[title="Platform Maintenance"]'),
		).toBeVisible();
		await waitForGlobalStep(authenticatedPage);

		const platformPage = new PlatformPage(authenticatedPage);
		await platformPage.Createplatform();
		await waitForGlobalStep(authenticatedPage);

		await platformPage.expectCreateNewPlatformLoaded();
		await waitForGlobalStep(authenticatedPage);

		await platformPage.createPlatform({
			platformId: '01',
			name: 'P21',
			description: 'P21-eNexus',
			active: true,
		});
		await waitForGlobalStep(authenticatedPage);

		await platformPage.clickSave();
		await waitForGlobalStep(authenticatedPage);
	});
});