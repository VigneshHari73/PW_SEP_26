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
    (0, test_1.test)('Prevent creation when required lead identity fields are missing', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const username = process.env.LEAFTAPS_USERNAME;
        const password = process.env.LEAFTAPS_PASSWORD;
        if (!username || !password) {
            throw new Error('Set LEAFTAPS_USERNAME and LEAFTAPS_PASSWORD before running this test.');
        }
        // 1. Launch the application.
        yield page.goto('http://leaftaps.com/opentaps/control/main');
        yield (0, test_1.expect)(page.getByRole('heading', { name: 'Leaftaps Login' })).toBeVisible();
        // 2. Log in with the test credentials and open CRM/SFA.
        yield page.getByRole('textbox', { name: 'Username' }).fill(username);
        yield page.getByRole('textbox', { name: 'Password' }).fill(password);
        yield page.getByRole('button', { name: 'Login' }).click();
        yield (0, test_1.expect)(page.getByRole('heading', { name: 'Welcome Demo B2C CSR' })).toBeVisible();
        yield page.getByRole('link', { name: 'CRM/SFA' }).click();
        // 3. Navigate to Leads and open Create Lead.
        yield page.getByRole('link', { name: 'Leads' }).click();
        yield page.getByRole('link', { name: 'Create Lead' }).click();
        yield (0, test_1.expect)(page).toHaveTitle(/Create Lead/);
        // 4. Leave the identity fields blank and submit the form.
        yield page.locator('#createLeadForm input[type="submit"][value="Create Lead"]').click();
        // 5. Verify validation feedback and that no lead detail page was created.
        yield (0, test_1.expect)(page).toHaveURL(/\/crmsfa\/control\/createLead$/);
        yield (0, test_1.expect)(page.getByText('The Following Errors Occurred:')).toBeVisible();
        yield (0, test_1.expect)(page.getByText('The following required parameter is missing: [crmsfa.createLead.companyName]')).toBeVisible();
        yield (0, test_1.expect)(page.getByText('The following required parameter is missing: [crmsfa.createLead.firstName]')).toBeVisible();
        yield (0, test_1.expect)(page.getByText('The following required parameter is missing: [crmsfa.createLead.lastName]')).toBeVisible();
    }));
});
