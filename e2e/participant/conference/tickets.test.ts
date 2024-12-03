import { expect, test } from '@playwright/test';

test.use({ storageState: 'e2e/.auth/participant.json' });

test.beforeEach(async ({ page }) => {
  await page.goto('/conference/tickets');
});

test('should render ticket', async ({ page }) => {
  const oldestTicket = page.locator('main').getByRole('listitem').last();
  await expect(
    oldestTicket.getByRole('link', { name: 'International Tech Summit' }),
  ).toBeVisible();
  await expect(
    page.getByText('2024-11-10 10:00 - 2024-11-12 19:00'),
  ).toBeVisible();
  await oldestTicket.getByRole('button').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(
    page.getByText('7fecf6cd-eb25-49d3-b818-8a836b21448b'),
  ).toBeVisible();
});

test('should render tickets list pagination', async ({ page }) => {
  await expect(page.getByLabel('pagination item 1 active')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Page Size' })).toBeVisible();
});
