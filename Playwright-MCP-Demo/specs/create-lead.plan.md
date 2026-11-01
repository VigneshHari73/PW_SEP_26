# Leaftaps Create Lead E2E Test Plan

## Application Overview

Application: Leaftaps CRM at http://leaftaps.com/opentaps/control/main (observed to redirect to HTTPS). Preconditions: application is reachable; use a fresh browser context and a test account authorized for CRM/SFA; provide credentials through LEAFTAPS_USERNAME and LEAFTAPS_PASSWORD environment variables rather than hard-coding them; generated lead data must use a unique run identifier because records persist in the shared environment. The login page exposes Username, Password, and Login. After login, open CRM/SFA, then use Leads / Create Lead (the CRM home also exposes a Create Lead shortcut). The Create Lead form includes Company Name, First name, Last name, Source, Marketing Campaign, contact fields, and address fields. Company Name, First name, and Last name have no HTML required attribute, so verify business validation at runtime rather than assuming browser-native required behavior. Primary happy-path test data: company `PW Lead Company <runId>`, first name `Taylor`, last name `Playwright <runId>`, source `Website`, email `playwright-<runId>@example.com`, and phone values using a valid test number. Do not use real customer data. Each scenario starts with a fresh unauthenticated browser context and independently generated identifiers. Lead creation has persistent side effects; remove test records only through an approved cleanup workflow if one exists.

## Test Scenarios

### 1. CRM Lead Creation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Create a lead with valid data and verify the saved record

**File:** `tests/create-lead.spec.ts`

**Steps:**
  1. Create a fresh browser context and navigate to http://leaftaps.com/opentaps/control/main.
    - expect: The Leaftaps login page is displayed; the browser may be redirected to HTTPS.
  2. Fill Username and Password from LEAFTAPS_USERNAME and LEAFTAPS_PASSWORD, then click Login.
    - expect: Login succeeds and the authenticated landing page is displayed.
  3. Open CRM/SFA, then navigate through Leads to Create Lead. If the landing page exposes the Create Lead shortcut, use that shortcut.
    - expect: The CRM Create Lead form is displayed.
  4. Fill Company Name with `PW Lead Company <runId>`, First name with `Taylor`, Last name with `Playwright <runId>`, Source with `Website`, E-Mail Address with `playwright-<runId>@example.com`, and phone fields with a valid test number. Leave other optional fields blank.
    - expect: Entered values remain in the corresponding controls; no unrelated validation errors appear.
  5. Click Create Lead once and wait for the application response.
    - expect: The application reports success or navigates to the newly created lead detail page; no server error is shown.
  6. Verify the lead detail page shows the unique company and full name, and verify the email if it is displayed.
    - expect: Displayed saved values match the submitted test data.
  7. If the detail view does not expose all fields, navigate to Leads / Find Leads, search using the unique run identifier, and open the exact matching result.
    - expect: Exactly one matching lead is found and its identifying values match this run's data.

#### 1.2. Prevent creation when required lead identity fields are missing

**File:** `tests/create-lead-validation.spec.ts`

**Steps:**
  1. Start from a fresh browser context; log in with the environment credentials; open CRM/SFA and the Create Lead form.
    - expect: The blank Create Lead form is displayed.
  2. Leave Company Name, First name, and Last name empty and submit the form.
    - expect: The application does not silently create a lead with blank identity data; it displays validation feedback or otherwise keeps the user on the form.
  3. Inspect the form for field-level or summary validation feedback and confirm the attempted record was not created, using Find Leads if necessary.
    - expect: Validation identifies the missing business-required information, and no matching blank or partial record is present.

#### 1.3. Reject a malformed email address without losing entered lead data

**File:** `tests/create-lead-validation.spec.ts`

**Steps:**
  1. Start from a fresh browser context; log in; navigate to CRM/SFA and Create Lead.
    - expect: The Create Lead form is displayed.
  2. Enter unique valid company, first-name, and last-name values, then enter `not-an-email` in E-Mail Address.
    - expect: The entered values are visible before submission.
  3. Submit the form and inspect the response.
    - expect: The application rejects the malformed email with useful validation feedback and does not create the lead.
  4. Correct the email to `playwright-<runId>@example.com` without re-entering the other values.
    - expect: Previously entered identity values remain available and the corrected email is accepted as valid input.

#### 1.4. Preserve supported punctuation in lead identity fields

**File:** `tests/create-lead-edge-cases.spec.ts`

**Steps:**
  1. Start from a fresh browser context; log in; navigate to CRM/SFA and Create Lead.
    - expect: The Create Lead form is displayed.
  2. Enter unique valid data using ordinary punctuation, for example company `PW O'Neil & Sons <runId>`, first name `Taylor-Jane`, and last name `D'Arcy <runId>`. Use a valid email and leave optional fields blank.
    - expect: The form accepts the punctuation as text and does not interpret it as markup or navigation.
  3. Submit once and inspect the lead detail page or search result.
    - expect: The lead is created once; punctuation and identity values are displayed correctly (allowing documented normalization such as trimming surrounding whitespace).
