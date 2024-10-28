import { expect, test } from '@playwright/test';

import { makeid } from '@/utils/makeid';

test.use({ storageState: 'e2e/.auth/organizer.json' });

test('should load form correctly', async ({ page }) => {
  await page.goto('/conference/create');

  await expect(
    page.getByRole('heading', { name: 'Create conference', exact: true }),
  ).toBeVisible();
  await expect(page.getByText('Informations', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Title')).toBeVisible();
  await expect(page.getByLabel('Acronym')).toBeVisible();

  await expect(page.getByText('Details', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Location')).toBeVisible();
  await expect(page.getByLabel('Ticket Price')).toBeVisible();
  await expect(page.getByRole('group', { name: 'Duration' })).toBeVisible();
  await expect(page.getByLabel('Website')).toBeVisible();
  await expect(page.getByLabel('Additional Information')).toBeVisible();

  await expect(page.getByText('Limits', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Limit of Participants')).toBeVisible();
  await expect(
    page.getByRole('group', { name: 'Registration Deadline' }),
  ).toBeVisible();

  await expect(page.getByText('Attachments', { exact: true })).toBeVisible();
  await expect(page.getByText('Upload a file')).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Agenda', exact: true }),
  ).toBeVisible();
  await expect(page.getByText('Timeline', { exact: true })).toBeVisible();
  await expect(
    page.getByText('Agenda Informations', { exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel('Event Name')).toBeVisible();
  await expect(page.getByLabel('Speaker')).toBeVisible();
  await expect(page.getByRole('group', { name: 'Start Time' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Add agenda item to timeline' }),
  ).toBeVisible();

  await expect(page.getByRole('button', { name: 'Create' })).toBeVisible();
});

test('should fire validation', async ({ page }) => {
  await page.goto('/conference/create');
  await page
    .getByRole('button', { name: 'Add agenda item to timeline' })
    .click();
  await page.getByRole('button', { name: 'Create' }).click();

  await expect(page.getByText('Title is required')).toBeVisible();
  await expect(page.getByText('Location is required')).toBeVisible();
  await expect(page.getByText('Speaker is required')).toBeVisible();
  await expect(page.getByText('Event is required')).toBeVisible();
  await expect(
    page.getByText('Start Date is required, End Date is required'),
  ).toHaveCount(2);
});

test.describe.serial('should create and view conference', async () => {
  const conferenceName = makeid(10);

  test('should create conference', async ({ page }) => {
    await page.goto('/conference/create');

    await page.getByLabel('Title').fill(conferenceName);
    await page.getByLabel('Acronym').fill(conferenceName.slice(0, 3));
    await page.getByLabel('Location').fill('Online');
    await page.getByLabel('Ticket Price').fill('100');

    await page.getByRole('button', { name: 'Calendar Duration*' }).click();
    await page.getByText('10').first().click();
    await page.getByText('20').first().click();
    await page.getByRole('group', { name: 'Start time' }).click();
    await page.getByRole('group', { name: 'End time' }).click();

    await expect(page).toHaveURL(/\/conference\/\d+/);
  });
});
