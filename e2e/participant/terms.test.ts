import { expect, test } from '@playwright/test';

test.use({ storageState: 'e2e/.auth/participant.json' });

test.beforeEach(async ({ page }) => {
  await page.goto('/terms');
});

test('should render terms accordeon', async ({ page }) => {
  await expect(
    page.getByRole('heading', { name: 'Terms of service' }),
  ).toBeVisible();
  const accordeonItems = page.getByRole('button').count();
  expect(await accordeonItems).toBeGreaterThan(1);
});
