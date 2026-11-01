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
    (0, test_1.test)('Create a lead with valid data and verify the saved record', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
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
        yield page.goto('http://leaftaps.com/opentaps/control/main');
        yield (0, test_1.expect)(page.getByRole('heading', { name: 'Leaftaps Login' })).toBeVisible();
        // 2. Log in with the supplied test credentials.
        yield page.getByRole('textbox', { name: 'Username' }).fill(username);
        yield page.getByRole('textbox', { name: 'Password' }).fill(password);
        yield page.getByRole('button', { name: 'Login' }).click();
        yield (0, test_1.expect)(page.getByRole('heading', { name: 'Welcome Demo B2C CSR' })).toBeVisible();
        // 3. Navigate to CRM/SFA.
        yield page.getByRole('link', { name: 'CRM/SFA' }).click();
        yield (0, test_1.expect)(page).toHaveTitle(/My Home/);
        // 4. Navigate to Leads and open Create Lead.
        yield page.getByRole('link', { name: 'Leads' }).click();
        yield (0, test_1.expect)(page).toHaveTitle(/My Leads/);
        yield page.getByRole('link', { name: 'Create Lead' }).click();
        yield (0, test_1.expect)(page).toHaveTitle(/Create Lead/);
        // 5. Enter unique lead data and create the lead.
        yield page.locator('#createLeadForm_companyName').fill(companyName);
        yield page.locator('#createLeadForm_firstName').fill('Taylor');
        yield page.locator('#createLeadForm_lastName').fill(lastName);
        yield page.locator('#createLeadForm_dataSourceId').selectOption('LEAD_WEBSITE');
        yield page.locator('#createLeadForm_primaryEmail').fill(email);
        yield (0, test_1.expect)(page.locator('#createLeadForm_companyName')).toHaveValue(companyName);
        yield (0, test_1.expect)(page.locator('#createLeadForm_firstName')).toHaveValue('Taylor');
        yield (0, test_1.expect)(page.locator('#createLeadForm_lastName')).toHaveValue(lastName);
        yield (0, test_1.expect)(page.locator('#createLeadForm_primaryEmail')).toHaveValue(email);
        yield page.locator('#createLeadForm input[type="submit"][value="Create Lead"]').click();
        // 6. Verify the created lead and its saved details.
        yield (0, test_1.expect)(page).toHaveURL(/\/crmsfa\/control\/viewLead\?partyId=/);
        yield (0, test_1.expect)(page.getByText(companyName)).toBeVisible();
        yield (0, test_1.expect)(page.getByText('Taylor', { exact: true })).toBeVisible();
        yield (0, test_1.expect)(page.getByText(lastName, { exact: true })).toBeVisible();
        yield (0, test_1.expect)(page.getByRole('link', { name: email })).toBeVisible();
        yield (0, test_1.expect)(page.getByText('Website', { exact: true })).toBeVisible();
    }));
});
