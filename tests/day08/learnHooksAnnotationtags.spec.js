import {test,expect} from "@playwright/test";


test.describe.serial("leads Management",  ()=>{

test.beforeAll("Basic project setup",async()=>{
console.log("Setpup is done")
})

test.beforeEach("Basic test config", async({page})=>{

// Launch application
        await page.goto("http://leaftaps.com/opentaps/control/main");

        // Login
        await page.locator("#username").fill("Demosalesmanager");
        await page.locator("#password").fill("crmsfa");
        await page.locator(".decorativeSubmit").click();
         // Navigate to Create Lead
        await page.getByRole("link", { name: "CRM/SFA" }).click();
        await page.getByRole("link", { name: "Leads" }).click();

})


test("create lead",{annotation:{
type: "Requirement",
description: "US 2263"
}, tag:"@regression"},async({page})=>{

        await page.getByRole("link", { name: "Create Lead" }).click();

        // Enter Lead details
        await page.locator("#createLeadForm_companyName")
            .fill("Testleaf");

        await page.locator("#createLeadForm_firstName")
            .fill("Bhuvanesh");

        await page.locator("#createLeadForm_lastName")
            .fill("Moorthy");

        await page.locator("#createLeadForm_primaryPhoneNumber")
            .fill("98127");

        // Create Lead
        await page.locator("input[name='submitButton']").click();

        // Verify Lead creation
        await expect(
            page.locator("#viewLead_companyName_sp")
        ).toContainText("Testleaf");

        console.log("Lead created successfully");

})

test.fail("edit lead",{annotation:{
type: "Requirement",
description: "US 2263"
}, tag:"@smoke"},async({page})=>{
 await page.getByRole("link", { name: "Find Leads" }).click();

        // Select Phone tab
        await page.getByText("Phone", { exact: true }).click();

        // Enter phone number
        await page.locator("input[name='phoneNumber']").fill("98127");

        // Find Lead
        await page.getByRole("button", { name: "Find Leads" }).click();

        // Select first Lead
        const lead = page.locator(
            "div.x-grid3-col-partyId a"
        ).first();

        await expect(lead).toBeVisible();

        await lead.click();

        // Edit Lead
        await page.getByRole("link", { name: "Edit" }).click();

        // Update Company Name
        const companyName = page.locator("#updateLeadForm_companyName");

        await companyName.fill("Qeagle");

        // Save
        await page.getByRole("button", { name: "Update" }).click();

        // Verify updated Company Name
        await expect(
            page.locator("#viewLead_companyName_sp")
        ).toContainText("Qeagle");

        console.log("Lead is edited successfully");
})


test.fixme("delete lead",{annotation:{
type: "Requirement",
description: "US 2263"
}, tag:"@regression"}, async({page})=>{
  await page.getByRole("link", { name: "Find Leads" }).click();

        // Select Phone tab
        await page.getByText("Phone", { exact: true }).click();

        // Enter phone number
        await page.locator("input[name='phoneNumber']").fill("98127");

        // Find Lead
        await page.getByRole("button", { name: "Find Leads" }).click();

        // Get first Lead ID
        const lead = page.locator(
            "div.x-grid3-cell-inner.x-grid3-col-partyId a"
        ).first();

        await expect(lead).toBeVisible();

        const leadID = await lead.innerText();

        console.log("Lead ID:", leadID);

        // Open Lead
        await lead.click();

        // Delete Lead
        await page.getByRole("link", { name: "Delete" }).click();

        // Navigate back to Find Leads
        await page.getByRole("link", { name: "Find Leads" }).click();

        // Search using deleted Lead ID
        await page.locator("input[name='id']").fill(leadID);

        await page.getByRole("button", { name: "Find Leads" }).click();

        // Verify Lead is deleted
        await expect(page.locator(".x-paging-info"))
            .toHaveText("No records to display");

        console.log("Lead deleted successfully");

})


test.afterEach("post condition", ({},testinfo)=>{

    console.log(testinfo.status,testinfo.title,testinfo.error);
    
})

test.afterAll("global tearDown",()=>{


    console.log("close all active resources");
    
})

})