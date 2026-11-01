import test from "@playwright/test"

test("AUTOMATE FACEBOOK LOGIN", async({page})=>{


    await page.goto("https://www.facebook.com/");
    await page.getByRole("textbox",{name:'Email address or mobile number'}).fill("testleaf.2023@gmail.com")
    await page.getByRole("textbox",{name:'Password'}).fill("Data@321")
    await page.getByRole("button",{name:'Log in'}).click();
    await page.waitForTimeout(20000)
    await page.getByRole("link", {name:'Find your account and log in.'}).click();
    await page.waitForTimeout(20000)    
    const title = await page.title();

    





}
)
