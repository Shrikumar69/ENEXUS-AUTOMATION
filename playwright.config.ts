import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

const stepDelayMs = Number(process.env.PW_SLOWMO_MS ?? 500);
const testTimeoutMs = parseEnvNumber(process.env.PW_TEST_TIMEOUT_MS) ?? 120000;
const expectTimeoutMs = parseEnvNumber(process.env.PW_EXPECT_TIMEOUT_MS) ?? 20000;
const actionTimeoutMs = parseEnvNumber(process.env.PW_ACTION_TIMEOUT_MS) ?? 20000;
const navigationTimeoutMs = parseEnvNumber(process.env.PW_NAVIGATION_TIMEOUT_MS) ?? 90000;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  timeout: testTimeoutMs,
  expect: {
    timeout: expectTimeoutMs,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* External QA endpoints can be slow and may present cert issues in automated browsers. */
    navigationTimeout: navigationTimeoutMs,
    actionTimeout: actionTimeoutMs,
    ignoreHTTPSErrors: true,
    launchOptions: {
      slowMo: Number.isFinite(stepDelayMs) ? stepDelayMs : 500,
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

function parseEnvNumber(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}
