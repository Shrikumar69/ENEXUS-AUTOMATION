import { test, expect } from '../../../fixtures/session.fixture';

test.describe('ENexus Login', () => {
  test('user can login with valid credentials', async ({ authenticatedPage }) => {
    await expect(authenticatedPage).not.toHaveURL(/\/login/i);
    await expect(authenticatedPage).toHaveTitle('ENexus', {
      timeout: 30000,
    });
  });
});
