import { test, expect } from '@playwright/test';

test.describe('CRM Lead Creation', () => {
  test('Create a lead with valid data and verify the saved record', async ({ page }) => {
    const username = process.env.LEAFTAPS_USERNAME;
    const password = process.env.LEAFTAPS_PASSWORD;

    if (!username || !password) {
      throw new Error('Set LEAFTAPS_USERNAME and LEAFTAPS_PASSWORD before running this test.');
    }

    const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const companyName = `PW Lead Company ${runId}`;
    const lastName = `Playwright ${runId}`;
    const email = `playwright-${runId}@example.com`;

    // 1. Launch the application.
    await page.goto('http://leaftaps.com/opentaps/control/main');
    await expect(page.getByRole('heading', { name: 'Leaftaps Login' })).toBeVisible();

    // 2. Log in with the supplied test credentials.
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Welcome Demo B2C CSR' })).toBeVisible();

    // 3. Navigate to CRM/SFA.
    await page.getByRole('link', { name: 'CRM/SFA' }).click();
    await expect(page).toHaveTitle(/My Home/);

    // 4. Navigate to Leads and open Create Lead.
    await page.getByRole('link', { name: 'Leads' }).click();
    await expect(page).toHaveTitle(/My Leads/);
    await page.getByRole('link', { name: 'Create Lead' }).click();
    await expect(page).toHaveTitle(/Create Lead/);

    // 5. Enter unique lead data and create the lead.
    await page.locator('#createLeadForm_companyName').fill(companyName);
    await page.locator('#createLeadForm_firstName').fill('Taylor');
    await page.locator('#createLeadForm_lastName').fill(lastName);
    await page.locator('#createLeadForm_dataSourceId').selectOption('LEAD_WEBSITE');
    await page.locator('#createLeadForm_primaryEmail').fill(email);
    await expect(page.locator('#createLeadForm_companyName')).toHaveValue(companyName);
    await expect(page.locator('#createLeadForm_firstName')).toHaveValue('Taylor');
    await expect(page.locator('#createLeadForm_lastName')).toHaveValue(lastName);
    await expect(page.locator('#createLeadForm_primaryEmail')).toHaveValue(email);
    await page.locator('#createLeadForm input[type="submit"][value="Create Lead"]').click();

    // 6. Verify the created lead and its saved details.
    await expect(page).toHaveURL(/\/crmsfa\/control\/viewLead\?partyId=/);
    await expect(page.getByText(companyName)).toBeVisible();
    await expect(page.getByText('Taylor', { exact: true })).toBeVisible();
    await expect(page.getByText(lastName, { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: email })).toBeVisible();
    await expect(page.getByText('Website', { exact: true })).toBeVisible();
  });
});
