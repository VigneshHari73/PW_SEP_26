"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const test_1 = __importStar(require("@playwright/test"));
let SNOW_ACCESS_TOKEN;
let SNOW_INCIDENT_SYS_ID;
test_1.default.describe.serial("API Request Chaining", () => {
    // generate an Oauth token and use it to make an API request
    (0, test_1.default)("Generate an Oauth token and use it to make an API request", (_a) => __awaiter(void 0, [_a], void 0, function* ({ request }) {
        const clientId = process.env.SNOW_CLIENT_ID;
        const clientSecret = process.env.SNOW_CLIENT_SECRET;
        const username = process.env.SNOW_USERNAME;
        const password = process.env.SNOW_PASSWORD;
        if (!clientId || !clientSecret || !username || !password) {
            throw new Error("Set SNOW_CLIENT_ID, SNOW_CLIENT_SECRET, SNOW_USERNAME, and SNOW_PASSWORD environment variables to run this test.");
        }
        const response = yield request.post("https://dev293148.service-now.com/oauth_token.do", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            form: {
                "grant_type": "password",
                "client_id": clientId,
                "client_secret": clientSecret,
                "username": username,
                "password": password,
            }
        });
        const responseBody = yield response.json();
        SNOW_ACCESS_TOKEN = responseBody.access_token;
        (0, test_1.expect)(response.status()).toBe(200);
        (0, test_1.expect)(SNOW_ACCESS_TOKEN).toBeTruthy();
    }));
    //create an incident in the incidents table using the Oauth token generated in the previous test
    (0, test_1.default)("Use the Oauth token to make an API request to create a incident in the incidents table", (_a) => __awaiter(void 0, [_a], void 0, function* ({ request }) {
        const response = yield request.post("https://dev293148.service-now.com/api/now/table/incident", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SNOW_ACCESS_TOKEN}`
            },
            data: {
                "short_description": "Test Incident from Playwright",
                "urgency": "3",
                "impact": "3"
            }
        });
        const responseBody = yield response.json();
        SNOW_INCIDENT_SYS_ID = responseBody.result.sys_id;
        (0, test_1.expect)(response.status()).toBe(201);
        console.log("Incident Created with Sys ID: " + SNOW_INCIDENT_SYS_ID);
        console.log("Response Body: " + (yield response.text()));
    }));
    // update the incident created in the previous test using the sys_id
    (0, test_1.default)("Update the incident created in the previous test using the sys_id", (_a) => __awaiter(void 0, [_a], void 0, function* ({ request }) {
        const response = yield request.patch("https://dev293148.service-now.com/api/now/table/incident/${SNOW_INCIDENT_SYS_ID}", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SNOW_ACCESS_TOKEN}`
            },
            data: {
                "short_description": "Asset apple imac [7373i837] has problems with the keyboard and mouse. Please replace the keyboard and mouse.",
                "urgency": "2",
                "impact": "2"
            }
        });
        const responseBody = yield response.json();
        (0, test_1.expect)(response.status()).toBe(200);
        console.log("Incident Updated with Sys ID: " + SNOW_INCIDENT_SYS_ID);
        console.log("Response Body: " + JSON.stringify(responseBody));
    }));
    // delete the incident created in the previous test using the sys_id
    (0, test_1.default)("Delete the incident created in the previous test using the sys_id", (_a) => __awaiter(void 0, [_a], void 0, function* ({ request }) {
        const response = yield request.delete("https://dev293148.service-now.com/api/now/table/incident/${SNOW_INCIDENT_SYS_ID}", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SNOW_ACCESS_TOKEN}`
            }
        });
        (0, test_1.expect)(response.status()).toBe(204);
        console.log("Incident Deleted with Sys ID: " + SNOW_INCIDENT_SYS_ID);
    }));
    // get the incident created in the previous test using the sys_id, verify that the incident is deleted and the response status code is 404
    (0, test_1.default)("Get the incident created in the previous test using the sys_id, verify that the incident is deleted and the response status code is 404", (_a) => __awaiter(void 0, [_a], void 0, function* ({ request }) {
        const response = yield request.get("https://dev293148.service-now.com/api/now/table/incident/${SNOW_INCIDENT_SYS_ID}", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SNOW_ACCESS_TOKEN}`
            }
        });
        (0, test_1.expect)(response.status()).toBe(404);
        console.log("Incident not found with Sys ID: " + SNOW_INCIDENT_SYS_ID);
    }));
});
