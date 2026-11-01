import { test, expect } from '@playwright/test';

test.describe('CRM Lead Creation', () => {
  test('Reject a malformed email address without losing entered lead data', async ({ page }) => {
    const username = process.env.LEAFTAPS_USERNAME;
    const password = process.env.LEAFTAPS_PASSWORD;

    if (!username || !password) {
      throw new Error('Set LEAFTAPS_USERNAME and LEAFTAPS_PASSWORD before running this test.');
    }

    const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const companyName = `PW Invalid Email Company ${runId}`;
    const lastName = `EmailTest${runId}`;
    const validEmail = `playwright-email-${runId}@example.com`;
    const companyField = page.locator('#createLeadForm_companyName');
    const firstNameField = page.locator('#createLeadForm_firstName');
    const lastNameField = page.locator('#createLeadForm_lastName');
    const emailField = page.locator('#createLeadForm_primaryEmail');

    // 1. Start with a fresh browser context, log in, and open CRM/SFA / Leads / Create Lead.
    await page.goto('http://leaftaps.com/opentaps/control/main');
    await expect(page.getByRole('heading', { name: 'Leaftaps Login' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Welcome Demo B2C CSR' })).toBeVisible();
    await page.getByRole('link', { name: 'CRM/SFA' }).click();
    await page.getByRole('link', { name: 'Leads' }).click();
    await page.getByRole('link', { name: 'Create Lead' }).click();
    await expect(page).toHaveTitle(/Create Lead/);

    // 2. Enter unique lead identity data and a malformed email.
    await companyField.fill(companyName);
    await firstNameField.fill('Taylor');
    await lastNameField.fill(lastName);
    await emailField.fill('not-an-email');

    // 3. Submit and verify email validation prevents creation.
    await page.locator('#createLeadForm input[type="submit"][value="Create Lead"]').click();
    await expect(page).toHaveURL(/\/crmsfa\/control\/createLead$/);
    await expect(page.getByText('Failed to create lead: E-mail address not formatted correctly, must be like: name@domain')).toBeVisible();
    await expect(companyField).toHaveValue(companyName);
    await expect(firstNameField).toHaveValue('Taylor');
    await expect(lastNameField).toHaveValue(lastName);
    await expect(emailField).toHaveValue('not-an-email');

    // 4. Correct the email, confirm identity data remains, then save and verify the lead.
    await emailField.fill(validEmail);
    await expect(companyField).toHaveValue(companyName);
    await expect(firstNameField).toHaveValue('Taylor');
    await expect(lastNameField).toHaveValue(lastName);
    await expect(emailField).toHaveValue(validEmail);
    await page.locator('#createLeadForm input[type="submit"][value="Create Lead"]').click();
    await expect(page).toHaveURL(/\/crmsfa\/control\/viewLead\?partyId=/);
    await expect(page.getByText(companyName)).toBeVisible();
    await expect(page.getByText('Taylor', { exact: true })).toBeVisible();
    await expect(page.getByText(lastName, { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: validEmail })).toBeVisible();
  });
});
