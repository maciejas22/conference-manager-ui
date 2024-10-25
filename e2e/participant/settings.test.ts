import { expect, test } from '@playwright/test';

import { makeid } from '@/utils/makeid';

test.use({ storageState: 'e2e/.auth/participant.json' });

test('should render news list pagination', async ({ page }) => {
  await page.goto('/user/settings/personal');

  await expect(page.getByRole('tab', { name: 'Account' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Password' })).toBeVisible();

  await expect(page.getByText('Update User')).toBeVisible();
  await expect(page.getByLabel('Name', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Surname')).toBeVisible();
  await expect(page.getByLabel('Username')).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();

  await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
});

test('should update username', async ({ page }) => {
  await page.goto('/user/settings/personal');

  await page.getByLabel('Username').fill(makeid(10));
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('User updated successfully')).toBeVisible();
});
