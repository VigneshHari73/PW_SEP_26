import  test from "@playwright/test";

test("LoginSalesForce",async({page})=>{

    await page.goto("https://login.salesforce.com/?locale=in");
    await page.locator("#username").fill("dilipkumar.rajendran@testleaf.com")
    await page.locator("[name='Login']").click()
    await page.locator("#password").fill("TestLeaf@2025")
    await page.locator("[name='Login']").click()

    const title = await page.title()
    console.log(title);
    

})

