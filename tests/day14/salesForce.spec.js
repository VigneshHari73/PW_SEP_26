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
test_1.default.describe.serial("API Request Chaining", () => {
    // generate an Oauth token and use it to make an API request
    (0, test_1.default)("Generate an Oauth token and use it to make an API request", (_a) => __awaiter(void 0, [_a], void 0, function* ({ request }) {
        const clientId = process.env.SF_CLIENT_ID;
        const clientSecret = process.env.SF_CLIENT_SECRET;
        if (!clientId || !clientSecret) {
            throw new Error("Set SF_CLIENT_ID and SF_CLIENT_SECRET environment variables to run this test.");
        }
        const response = yield request.post("https://orgfarm-8ec72f076a-dev-ed.develop.my.salesforce.com/services/oauth2/token", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            form: {
                "grant_type": "client_credentials",
                "client_id": clientId,
                "client_secret": clientSecret,
            }
        });
        (0, test_1.expect)(response.status()).toBe(200);
        const responseBody = yield response.json();
        (0, test_1.expect)(responseBody.access_token).toBeTruthy();
    }));
});
