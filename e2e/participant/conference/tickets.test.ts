import { expect, test } from '@playwright/test';

test.use({ storageState: 'e2e/.auth/participant.json' });

test.beforeEach(async ({ page }) => {
  await page.goto('/conference/tickets');
});

test('should render tickets list', async ({ page }) => {
  await expect(page.getByLabel('pagination item 1 active')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Page Size' })).toBeVisible();
  await expect(page.locator('canvas').first()).toBeVisible();
});
