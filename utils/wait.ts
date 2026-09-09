import { type Page } from '@playwright/test';

const DEFAULT_GLOBAL_WAIT_MS = 500;

export function getGlobalWaitMs(): number {
  const configured = Number(process.env.PW_SLOWMO_MS);
  return Number.isFinite(configured) && configured >= 0 ? configured : DEFAULT_GLOBAL_WAIT_MS;
}

export async function waitForGlobalStep(page: Page): Promise<void> {
  await page.waitForTimeout(getGlobalWaitMs());
}
