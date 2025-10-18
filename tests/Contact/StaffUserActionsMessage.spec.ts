import { test, expect } from '@playwright/test';
import { LoginSelectors } from '../Selectors/UserLoginSelectors';
import {Login} from '../utils/Login'
import { MessageSelectors } from '../Selectors/MessagesSelectors';
import { ContactSelectors } from '../Selectors/ContactSelectors';



test.describe('Staff user actions a message',()=>{
    test.beforeEach(async({page, isMobile,})=>{
    await page.goto('/');
        if (isMobile){
            await page.locator(LoginSelectors.HamburgerIcon).click();
        }

    })


    test('Staff user validates new message', async({page})=>{
        const staffLogin = new Login(page)
        await staffLogin.NavToLoginPage();
        await staffLogin.Login(process.env.STAFF_USER_LOGIN || '', process.env.STAFF_PASSWORD || '');
        await page.locator(ContactSelectors.ContactNavButton).click();
        await page.locator(ContactSelectors.Subject).selectOption('Payments');
        await page.locator(ContactSelectors.FormBox).fill("This is a whooooooooooole lot of words. Hopefully 50 words long.")
        await page.locator(ContactSelectors.SendButton).click();
        await page.locator(MessageSelectors.UserDropdown).click();
        await page.locator(MessageSelectors.MessagesButton).click();
        await page.getByText("Details").first().click();
        await expect(MessageSelectors.AddReplyTextBox).not.toBeUndefined();
    });
        
    test('Staff changes the status of a message',async({page})=>{
        const staffLogin = new Login(page)
        await staffLogin.NavToLoginPage();
        await staffLogin.Login(process.env.STAFF_USER_LOGIN || '', process.env.STAFF_PASSWORD || '');
        await page.locator(ContactSelectors.ContactNavButton).click();
        await page.getByText("Details").first().click();
        await page.locator(MessageSelectors.MessageStatus).selectOption("RESOLVED");
        await page.locator(MessageSelectors.MessageTextField).fill("This has been resolved");
        await page.locator(MessageSelectors.ReplySubmit).click();
        await expect(MessageSelectors.AddReplyTextBox).toContain("This has been resolved")
    })

})

