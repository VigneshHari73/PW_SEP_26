import test from "@playwright/test";

const locations = [{
    LocationName: "PSNA",
    lat: 10.4163,
    long: 77.9005

}, {
    LocationName: "FX",
    lat: 8.7314,
    long: 77.7235
}]

for (const location of locations) {
    test.describe.serial("multiple GEO location m0cking",  () => {
        test.use({
            permissions: ["geolocation"],
            geolocation: {
                latitude: location.lat,
                longitude: location.long
            }
        })

        test(`learn geo location location mocking ${location.LocationName}`, async ({ page }) => {
            await page.goto("https://mylocation.org")
            const mapview = page.locator(`[id="map"]`)
           await mapview.scrollIntoViewIfNeeded()
            await page.waitForTimeout(3000)
            await mapview.screenshot({ path: `screenshot/${location.LocationName}.png` })
      })
    })


}

