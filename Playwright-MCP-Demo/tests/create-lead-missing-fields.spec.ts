import { test, expect } from '@playwright/test';

test.describe('CRM Lead Creation', () => {
  test('Prevent creation when required lead identity fields are missing', async ({ page }) => {
    const username = process.env.LEAFTAPS_USERNAME;
    const password = process.env.LEAFTAPS_PASSWORD;

    if (!username || !password) {
      throw new Error('Set LEAFTAPS_USERNAME and LEAFTAPS_PASSWORD before running this test.');
    }

    // 1. Launch the application.
    await page.goto('http://leaftaps.com/opentaps/control/main');
    await expect(page.getByRole('heading', { name: 'Leaftaps Login' })).toBeVisible();

    // 2. Log in with the test credentials and open CRM/SFA.
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Welcome Demo B2C CSR' })).toBeVisible();
    await page.getByRole('link', { name: 'CRM/SFA' }).click();

    // 3. Navigate to Leads and open Create Lead.
    await page.getByRole('link', { name: 'Leads' }).click();
    await page.getByRole('link', { name: 'Create Lead' }).click();
    await expect(page).toHaveTitle(/Create Lead/);

    // 4. Leave the identity fields blank and submit the form.
    await page.locator('#createLeadForm input[type="submit"][value="Create Lead"]').click();

    // 5. Verify validation feedback and that no lead detail page was created.
    await expect(page).toHaveURL(/\/crmsfa\/control\/createLead$/);
    await expect(page.getByText('The Following Errors Occurred:')).toBeVisible();
    await expect(page.getByText('The following required parameter is missing: [crmsfa.createLead.companyName]')).toBeVisible();
    await expect(page.getByText('The following required parameter is missing: [crmsfa.createLead.firstName]')).toBeVisible();
    await expect(page.getByText('The following required parameter is missing: [crmsfa.createLead.lastName]')).toBeVisible();
  });
});
