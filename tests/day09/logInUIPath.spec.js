import test from "@playwright/test";

test("Login UI Path", async({page, context})=>{
    await page.goto("https://uibank.uipath.com/welcome")
    await page.getByRole("link", { name: "Login" }).click();
    await page.locator("#username").fill("FebApiuser")
     await page.locator("#password").fill("Eagle@123")
     await page.getByRole("button", { name: "Sign In" }).click();
     await page.getByRole("button", { name: "I agree to the Privacy Policy →" }).click();
     await page.getByText("Apply For New Account ").click()
     await context.storageState({
        path: 'data/auth.json'
     })



})