import puppeteer from 'puppeteer';
import instagramIds from "../instagramIds.js";
import emailVerified from "./emailVerified.js";

/**
 * @param {boolean} show
 */
export default async function(show){
    const browser = await puppeteer.launch({headless: ! show, executablePath: 'C:/Program Files/Google/Chrome/Application/Chrome.exe' });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/');

    const cookieButtonSelector = 'div[role="dialog"] button:nth-child(1)';
    await page.waitForSelector(cookieButtonSelector);
    await page.click(cookieButtonSelector);

    const signupLinkSelector = 'a[href="/accounts/emailsignup/"]';
    await page.waitForSelector(signupLinkSelector);
    await page.click(signupLinkSelector);
    const selectorLogin = {
        email: 'input[name="emailOrPhone"]',
        name: 'input[name="fullName"]',
        username: 'input[name="username"]',
        password: 'input[name="password"]'
    };

    for (const i in selectorLogin) {
        console.log(i, selectorLogin[i], instagramIds[i]);
        await page.waitForSelector(selectorLogin[i]);
        await page.focus(selectorLogin[i]);
        await page.keyboard.type(instagramIds[i]);
        new Promise(resolve => setTimeout(resolve, 20000));
    }
    const submit = 'form button[type="submit"]';
    await page.waitForSelector(submit);
    await page.click(submit);

    const selectBirthdayDate = {
        month: 'span span:nth-child(1) select',
        day: 'span span:nth-child(2) select',
        year: 'span span:nth-child(3) select'
    }

    for (const selectBirthdayDateKey in selectBirthdayDate) {
        await page.waitForSelector(selectBirthdayDate[selectBirthdayDateKey]);
        await page.click(selectBirthdayDate[selectBirthdayDateKey]);
        await page.evaluate((type, key, instagramIds)=>{
            document.querySelector(type).value = instagramIds[key];
        }, selectBirthdayDate[selectBirthdayDateKey], selectBirthdayDateKey, instagramIds);
        await page.click(selectBirthdayDate[selectBirthdayDateKey]);
    }

    await page.click('body');
    const elements = await page.$x('//button');
    await elements[1].click();

    const codeInput = 'input[name="email_confirmation_code"]'
    await page.waitForSelector(codeInput);
    let getCode = await emailVerified(instagramIds.emailName, instagramIds.emailId);
    console.log(Array.from(getCode).length);
    while(getCode.result.length === 0){
        getCode = await emailVerified(instagramIds.emailName, instagramIds.emailId);
        console.log(getCode)
        new Promise(resolve => setTimeout(resolve, 2000));
    }

    let code = String(getCode.result[0].value).split("Subject: ");
    code = code[1].slice(0, 6);
    await page.waitForSelector(codeInput);
    await page.focus(codeInput);
    await page.keyboard.type(code);
    await page.click(submit);
}