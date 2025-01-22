import { expect, test } from '@playwright/test';

test.use({ storageState: 'e2e/.auth/participant.json' });

test.beforeEach(async ({ page }) => {
  await page.goto('/conference/list');
});

test('should render listing', async ({ page }) => {
  await expect(page.getByText('Running')).toBeVisible();
  await expect(page.getByText('Starting in less than 24h')).toBeVisible();
  await expect(page.getByText('Total conducted')).toBeVisible();
  await expect(page.getByText('Total participants today')).toBeVisible();

  await expect(page.getByLabel('Search by title')).toBeVisible();
  await expect(page.getByPlaceholder('Type to search...')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Columns' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Filters' })).toBeVisible();

  await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible();
  await expect(
    page.getByRole('columnheader', { name: 'Start Date' }),
  ).toBeVisible();
  await expect(
    page.getByRole('columnheader', { name: 'Location' }),
  ).toBeVisible();
  await expect(
    page.getByRole('columnheader', { name: 'Participants Count' }),
  ).toBeVisible();
  await expect(
    page.getByRole('columnheader', { name: 'Actions' }),
  ).toBeVisible();

  await expect(page.getByLabel('pagination item 1 active')).toBeVisible();
  await expect(page.getByLabel('pagination item 2')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Page Size' })).toBeVisible();
});

test('should sort by location', async ({ page }) => {
  const locationHeader = page.getByRole('columnheader', { name: 'Location' });
  await locationHeader.click();
  await expect(page.getByText('Loading...')).toBeHidden();

  const tableHeaders = await page.getByRole('columnheader').all();
  let locationIndex = -1;
  for (let i = 0; i < tableHeaders.length; i++) {
    const headerText = await tableHeaders[i].textContent();
    if (headerText === 'Location') {
      locationIndex = i - 1;
      break;
    }
  }

  const rows = await page.getByRole('row').all();
  const dataRows = rows.slice(1, rows.length - 1);
  const locations = await Promise.all(
    dataRows.map(async (row) => {
      const cells = await row.getByRole('gridcell').all();
      const location = await cells[locationIndex].innerText();
      return location;
    }),
  );

  const sortedLocations = [...locations].sort();
  expect(locations).toEqual(sortedLocations);
});

test('should allow to adjust columns', async ({ page }) => {
  const columnsButton = page.getByRole('button', { name: 'Columns' });
  await columnsButton.click();

  const idColumnCheckbox = page.getByRole('menuitemcheckbox', { name: 'ID' });
  await idColumnCheckbox.click();
  await page.keyboard.press('Escape');

  await expect(page.getByRole('columnheader', { name: 'ID' })).toBeVisible();
});

test('should allow to filter by title', async ({ page }) => {
  const searchInput = page.getByLabel('Search by title');
  await searchInput.fill('FinTech Summit');
  await page.waitForTimeout(500);
  await expect(page.getByText('Loading...')).toBeHidden();

  await expect(page.getByRole('row').nth(1)).toBeVisible();
  expect(await page.getByRole('row').count()).toBe(2);
});
