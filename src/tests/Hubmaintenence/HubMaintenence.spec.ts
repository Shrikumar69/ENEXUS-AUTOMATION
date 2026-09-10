import { test, expect } from '../../../fixtures/session.fixture';
import { MenuFixture } from '../../../fixtures/menu.fixture';
import { HubMaintenencePage } from '../../pages/Hubmaintenence/HubMaintenence.page';
import { waitForGlobalStep } from '../../../utils/wait';

test.describe('Hub Maintenance', () => {
  test('user can create hub with required fields and save', async ({ authenticatedPage }) => {
    await expect(authenticatedPage).not.toHaveURL(/\/login/i);
    await expect(authenticatedPage).toHaveTitle('ENexus');

    const menu = new MenuFixture(authenticatedPage);
    await menu.searchAndSelectMenuItem('Hub');
    await waitForGlobalStep(authenticatedPage);

    const hubMaintenancePage = new HubMaintenencePage(authenticatedPage);
    await expect(
      authenticatedPage.locator('h1#ep-view-title[title="Hub Maintenance"]'),
    ).toBeVisible();
    await waitForGlobalStep(authenticatedPage);

    await hubMaintenancePage.clickAddNewHub();
    await waitForGlobalStep(authenticatedPage);

    await expect(authenticatedPage.locator('h1#ep-view-title[title="Create Hub"]')).toBeVisible();
    await waitForGlobalStep(authenticatedPage);

    const hubId = `HUB-${Date.now()}`;
    await hubMaintenancePage.fillHubId(hubId);
    await waitForGlobalStep(authenticatedPage);

    await hubMaintenancePage.fillRegion('SG');
    await waitForGlobalStep(authenticatedPage);

    await hubMaintenancePage.fillBaseUrl('https://api.example.com');
    await waitForGlobalStep(authenticatedPage);

    await hubMaintenancePage.clickSave();
    await waitForGlobalStep(authenticatedPage);
  });
});
