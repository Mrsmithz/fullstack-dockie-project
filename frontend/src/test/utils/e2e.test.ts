import puppeteer from "puppeteer";
import path from "path"


describe("End to end testing with jest and puppeteer", () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;


  beforeAll(async () => {
    browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
    page = await browser.newPage();
    await page.setViewport({width: 1366, height: 768});
  });

  it("routing to create post page", async () => {
    await page.goto("http://188.166.185.128");
    await page.click('[id="create-btn"]');
    await page.waitForSelector("#create-post-title")
    const path = await page.url()
    expect(path).toContain("http://188.166.185.128/createpost")
    
  });

  it("upload file in create post page", async () => {
    await page.waitForSelector('input[type=file]');
    const inputUploadHandle = await page.$('input[type=file]');
    let fileToUpload=  path.join(__dirname, "../../utils/File/MockingFile.pdf")
    inputUploadHandle!.uploadFile(fileToUpload);
    await page.waitForSelector("#file-name-tag")
    const text = await page.$eval("#file-name-tag", (e) => e.textContent)
    expect(text).toContain("MockingFile.pdf")

  });
  
  it("fill form and create post ", async() => {
    const title = "Mocking title"
    const description = "Mocking description"
    const contact = "Mocking contact"

    await page.waitForSelector("#next-btn")
    await page.click('[id="next-btn"]')
    await page.type('[id="title"]', title)
    await page.type('[id="description"]', description)
    await page.type('[id="contact"]', contact)
    await page.click('[id="next-btn-2"]')

    const titleText = await page.$eval("#title", (e) => e.textContent)
    const descriptionText = await page.$eval("#description", (e) => e.textContent)
    const contactText = await page.$eval("#contact", (e) => e.textContent)

    expect(titleText).toBe(title)
    expect(descriptionText).toBe(description)
    expect(contactText).toBe(contact)

  })

  it("routing to homepage by pressing finish button", async() => {
    await page.click('[id="finish-btn"]')
    await page.waitForTimeout(500)
    const path = await page.url()

    expect(path).toBe("http://188.166.185.128/")
  })

  afterAll(() => {
    browser.close()
  })
});
