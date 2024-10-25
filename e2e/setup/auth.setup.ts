import { test as setup } from '@playwright/test';

const participantFile = 'e2e/.auth/participant.json';
setup('authenticate as participant', async ({ page }) => {
  await page.goto('/user/login');
  await page.getByLabel('Email').fill('participant1@local.com');
  await page.getByLabel('Password').fill('Secret1!');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('/');
  await page.context().storageState({ path: participantFile });
});

const organizerFile = 'e2e/.auth/organizer.json';
setup('authenticate as organizer', async ({ page }) => {
  await page.goto('/user/login');
  await page.getByLabel('Email').fill('organizer1@local.com');
  await page.getByLabel('Password').fill('Secret1!');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('/');
  await page.context().storageState({ path: organizerFile });
});
