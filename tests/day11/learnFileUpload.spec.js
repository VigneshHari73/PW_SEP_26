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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = __importStar(require("@playwright/test"));
const path_1 = __importDefault(require("path"));
(0, test_1.default)("File Upload", (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    yield page.goto("https://www.leafground.com/file.xhtml");
    const uploadButton = page.locator("//input[@type='file']").first();
    yield uploadButton.setInputFiles(path_1.default.join(__dirname, '../../data/Postman.txt'));
    yield page.pause();
    const fileName = page.locator("//span[@class='ui-fileupload-filename']");
    yield (0, test_1.expect)(fileName).toHaveText("Postman.txt 2.1 KB");
}));
(0, test_1.default)("file upload using file chooser event", (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    yield page.goto("https://the-internet.herokuapp.com");
    yield page.getByRole("link", { name: 'File Upload' }).click();
    const [fileChooseEvent] = yield Promise.all([page.waitForEvent('filechooser'), page.locator(`//div[@id='drag-drop-upload']`).click()]);
    yield fileChooseEvent.setFiles([path_1.default.join(__dirname, `../../data/TCS_InterviewQuestions.docx`), path_1.default.join(__dirname, `../../data/TCS_InterviewQuestions (1).docx`)]);
    yield page.pause();
    const fileName = page.locator(`//div[@class='dz-filename']/span`).first();
    yield (0, test_1.expect)(fileName).toHaveText(/TCS_InterviewQuestions/);
}));
