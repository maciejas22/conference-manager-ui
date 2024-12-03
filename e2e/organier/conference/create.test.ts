import { expect, Page, test } from '@playwright/test';

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

const selectDateTimeRange = async (
  page: Page,
  btnName: string,
  dateTime = {
    startDate: '10',
    endDate: '20',
    startTime: '1111',
    endTime: '2222',
  },
) => {
  await page.getByRole('button', { name: btnName }).click();
  const calendar = page.getByRole('dialog');
  await calendar.getByRole('button', { name: 'Next' }).first().click();
  const datePickerGrid = calendar.getByRole('grid');
  await datePickerGrid.getByText(dateTime.startDate).first().click();
  await datePickerGrid.getByText(dateTime.endDate).first().click();
  await calendar.getByText('Start time').click();
  await page.keyboard.type(dateTime.startTime);
  await calendar.getByText('End time').click();
  await page.keyboard.type(dateTime.endTime);
  await page.keyboard.press('Escape');
};

const selectDateTime = async (
  page: Page,
  btnName: string,
  dateTime = {
    date: '10',
    time: '1111',
  },
) => {
  await page.getByRole('button', { name: btnName }).click();
  const calendar = page.getByRole('dialog');
  await calendar.getByRole('button', { name: 'Next' }).first().click();
  const datePickerGrid = calendar.getByRole('grid');
  await datePickerGrid.getByText(dateTime.date).first().click();
  await calendar.getByText('Time').click();
  await page.keyboard.type(dateTime.time);
  await page.keyboard.press('Escape');
};

test.describe.serial('should create and view conference', async () => {
  const conferenceName = makeid(10);

  test('should create conference', async ({ page }) => {
    await page.goto('/conference/create');

    await page.getByLabel('Title').fill(conferenceName);
    await page.getByLabel('Acronym').fill(conferenceName.slice(0, 3));
    await page.getByLabel('Location').fill('Online');
    await page.getByLabel('Ticket Price').fill('0');
    await selectDateTimeRange(page, 'Calendar Duration');

    await page.getByLabel('Limit of Participants').fill('100');
    await selectDateTime(page, 'Calendar Registration Deadline');

    await page.getByLabel('Event Name').fill('Test Agenda Event');
    await page.getByLabel('Speaker').fill('Test Agenda Speaker');
    await selectDateTimeRange(page, 'Calendar Start Time');
    await page
      .getByRole('button', { name: 'Add agenda item to timeline' })
      .click();

    await page.getByRole('button', { name: 'Create' }).click();

    await expect(
      page.getByText('Conference created successfully'),
    ).toBeVisible();
  });

  test('should edit conference', async ({ page }) => {
    await page.goto('/conference/list');
    await page.getByLabel('Search by title').fill(conferenceName);
    await page.getByLabel(conferenceName).getByRole('link').click();

    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByLabel('Title').fill('Updated ' + conferenceName);
    await page
      .getByLabel('Acronym')
      .fill('Updated ' + conferenceName.slice(0, 3));
    await page.getByLabel('Location').fill('Offile');

    await page.getByLabel('Delete Test Agenda Speaker').click();

    await page.getByLabel('Event Name').fill('Better Test Agenda Event');
    await page.getByLabel('Speaker').fill('Better Test Agenda Speaker');
    await selectDateTimeRange(page, 'Calendar Start Time');
    await page
      .getByRole('button', { name: 'Add agenda item to timeline' })
      .click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(
      page.getByText('Conference modified successfully'),
    ).toBeVisible();
  });
});
