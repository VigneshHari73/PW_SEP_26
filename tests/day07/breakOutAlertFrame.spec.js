import test, { expect } from "@playwright/test"; 

test("Try it", async({page})=>{

await page.goto("https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm")

page.on("dialog", async (dialog) => {

        console.log(dialog.message());
        await dialog.dismiss();

    })

const frame = page.frameLocator("#iframeResult");
await frame.getByRole("button",{name:'Try it'}).click();

    

await expect(frame.locator("#demo")).toContainText("You pressed Cancel!");

})