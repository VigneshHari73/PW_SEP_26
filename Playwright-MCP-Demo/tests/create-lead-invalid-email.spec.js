"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('CRM Lead Creation', () => {
    (0, test_1.test)('Reject a malformed email address without losing entered lead data', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
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
        yield page.goto('http://leaftaps.com/opentaps/control/main');
        yield (0, test_1.expect)(page.getByRole('heading', { name: 'Leaftaps Login' })).toBeVisible();
        yield page.getByRole('textbox', { name: 'Username' }).fill(username);
        yield page.getByRole('textbox', { name: 'Password' }).fill(password);
        yield page.getByRole('button', { name: 'Login' }).click();
        yield (0, test_1.expect)(page.getByRole('heading', { name: 'Welcome Demo B2C CSR' })).toBeVisible();
        yield page.getByRole('link', { name: 'CRM/SFA' }).click();
        yield page.getByRole('link', { name: 'Leads' }).click();
        yield page.getByRole('link', { name: 'Create Lead' }).click();
        yield (0, test_1.expect)(page).toHaveTitle(/Create Lead/);
        // 2. Enter unique lead identity data and a malformed email.
        yield companyField.fill(companyName);
        yield firstNameField.fill('Taylor');
        yield lastNameField.fill(lastName);
        yield emailField.fill('not-an-email');
        // 3. Submit and verify email validation prevents creation.
        yield page.locator('#createLeadForm input[type="submit"][value="Create Lead"]').click();
        yield (0, test_1.expect)(page).toHaveURL(/\/crmsfa\/control\/createLead$/);
        yield (0, test_1.expect)(page.getByText('Failed to create lead: E-mail address not formatted correctly, must be like: name@domain')).toBeVisible();
        yield (0, test_1.expect)(companyField).toHaveValue(companyName);
        yield (0, test_1.expect)(firstNameField).toHaveValue('Taylor');
        yield (0, test_1.expect)(lastNameField).toHaveValue(lastName);
        yield (0, test_1.expect)(emailField).toHaveValue('not-an-email');
        // 4. Correct the email, confirm identity data remains, then save and verify the lead.
        yield emailField.fill(validEmail);
        yield (0, test_1.expect)(companyField).toHaveValue(companyName);
        yield (0, test_1.expect)(firstNameField).toHaveValue('Taylor');
        yield (0, test_1.expect)(lastNameField).toHaveValue(lastName);
        yield (0, test_1.expect)(emailField).toHaveValue(validEmail);
        yield page.locator('#createLeadForm input[type="submit"][value="Create Lead"]').click();
        yield (0, test_1.expect)(page).toHaveURL(/\/crmsfa\/control\/viewLead\?partyId=/);
        yield (0, test_1.expect)(page.getByText(companyName)).toBeVisible();
        yield (0, test_1.expect)(page.getByText('Taylor', { exact: true })).toBeVisible();
        yield (0, test_1.expect)(page.getByText(lastName, { exact: true })).toBeVisible();
        yield (0, test_1.expect)(page.getByRole('link', { name: validEmail })).toBeVisible();
    }));
});
