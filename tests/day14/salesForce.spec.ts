import test, { expect } from "@playwright/test"


test.describe.serial("API Request Chaining", () => {

// generate an Oauth token and use it to make an API request
test("Generate an Oauth token and use it to make an API request", async ({ request }) => {
     const clientId = process.env.SF_CLIENT_ID
     const clientSecret = process.env.SF_CLIENT_SECRET
     if (!clientId || !clientSecret) {
        throw new Error("Set SF_CLIENT_ID and SF_CLIENT_SECRET environment variables to run this test.")
     }

     const response = await request.post("https://orgfarm-8ec72f076a-dev-ed.develop.my.salesforce.com/services/oauth2/token",{
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
            "grant_type": "client_credentials",
            "client_id": clientId,
            "client_secret": clientSecret,
        }
    })
    expect(response.status()).toBe(200)
    const responseBody = await response.json()
    expect(responseBody.access_token).toBeTruthy()
})




})