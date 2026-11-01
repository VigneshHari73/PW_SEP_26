"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = __importDefault(require("@playwright/test"));
const locations = [{
        LocationName: "PSNA",
        lat: 10.4163,
        long: 77.9005
    }, {
        LocationName: "FX",
        lat: 8.7314,
        long: 77.7235
    }];
for (const location of locations) {
    test_1.default.describe.serial("multiple GEO location m0cking", () => {
        test_1.default.use({
            permissions: ["geolocation"],
            geolocation: {
                latitude: location.lat,
                longitude: location.long
            }
        });
        (0, test_1.default)(`learn geo location location mocking ${location.LocationName}`, (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
            yield page.goto("https://mylocation.org");
            const mapview = page.locator(`[id="map"]`);
            yield mapview.scrollIntoViewIfNeeded();
            yield page.waitForTimeout(3000);
            yield mapview.screenshot({ path: `screenshot/${location.LocationName}.png` });
        }));
    });
}
