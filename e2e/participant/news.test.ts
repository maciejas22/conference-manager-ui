import { expect, test } from '@playwright/test';

test.use({ storageState: 'e2e/.auth/participant.json' });

test.beforeEach(async ({ page }) => {
  await page.goto('/news');
});

test('should render news list pagination', async ({ page }) => {
  await expect(page.getByLabel('pagination item 1 active')).toBeVisible();
  await expect(page.getByLabel('pagination item 2')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Page Size' })).toBeVisible();
});
