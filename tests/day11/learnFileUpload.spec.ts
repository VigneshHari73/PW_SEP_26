import test,{expect} from "@playwright/test";
import path from "path";

test("File Upload",async({page})=>{

    await page.goto("https://www.leafground.com/file.xhtml")
    const uploadButton = page.locator("//input[@type='file']").first()
    await uploadButton.setInputFiles(path.join(__dirname,'../../data/Postman.txt'))
    await page.pause();
    const fileName = page.locator("//span[@class='ui-fileupload-filename']")
    await expect(fileName).toHaveText("Postman.txt 2.1 KB")
   
})

test("file upload using file chooser event",async({page})=>{
 await page.goto("https://the-internet.herokuapp.com")
 await page.getByRole("link",{name:'File Upload'}).click()
 const [fileChooseEvent] = await Promise.all([page.waitForEvent('filechooser'),page.locator(`//div[@id='drag-drop-upload']`).click()])
 await fileChooseEvent.setFiles([path.join(__dirname,`../../data/TCS_InterviewQuestions.docx`),path.join(__dirname,`../../data/TCS_InterviewQuestions (1).docx`)])
 await page.pause();
const fileName = page.locator(`//div[@class='dz-filename']/span`).first()
await expect(fileName).toHaveText(/TCS_InterviewQuestions/)
})


