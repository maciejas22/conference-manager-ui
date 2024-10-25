import { expect, test } from '@playwright/test';

test.use({ storageState: 'e2e/.auth/participant.json' });

test('should render details', async ({ page }) => {
  await page.goto('/conference/1');
  await expect(page.getByText('Location')).toBeVisible();
  await expect(page.getByText('Dates')).toBeVisible();
  await expect(page.getByText('Participants')).toBeVisible();
  await expect(page.getByText('Website')).toBeVisible();
  await expect(page.getByText('Registration Deadline')).toBeVisible();
  await expect(page.getByText('Ticket Price')).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Agenda' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Attachments' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Leave conference' }),
  ).toBeVisible();
});

test('should join and leave conference', async ({ page }) => {
  await page.goto('/conference/2');
  await expect(page.getByText('1/300')).toBeVisible();
  await page.getByRole('button', { name: 'Join conference' }).click();
  await expect(page.getByText('2/300')).toBeVisible();
  await page.getByRole('button', { name: 'Leave conference' }).click();
  await expect(page.getByText('1/300')).toBeVisible();
});
