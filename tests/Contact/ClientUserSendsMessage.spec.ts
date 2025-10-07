import { test, expect } from '@playwright/test';
import { LoginSelectors } from '../Selectors/UserLoginSelectors';
import { ContactSelectors } from '../Selectors/ContactSelectors';
import path from 'path/win32';

test.describe("Client Sends a message",()=>{
    test.beforeEach(async({page,isMobile})=>{
        await page.goto('/');
        if (isMobile){
            await page.locator(LoginSelectors.HamburgerIcon).click();
        }
    })

    test('User sends a message with an attachment', async({page})=>{
        await page.locator(ContactSelectors.ContactNavButton).click();
        await page.locator(ContactSelectors.FirstName).fill("John");
        await page.locator(ContactSelectors.LastName).fill("Doe");
        await page.locator(ContactSelectors.Email).fill((Math.random() + 1).toString(36).substring(7) + "@grr.la");
        await page.locator(ContactSelectors.Subject).selectOption('Payments');
        await page.locator(ContactSelectors.FormBox).fill("This is a whooooooooooole lot of words. Hopefully 50 words long.")
        await page.locator(ContactSelectors.Attachments).setInputFiles('EmptyTextFile.txt');
        await page.locator(ContactSelectors.SendButton).click();
        await expect(page.getByText('Thanks for your message! We will contact you shortly.')).toBeVisible();

    })

    test('Verify error states on contact page', async({page}) =>{
        await page.locator(ContactSelectors.ContactNavButton).click();
        await page.locator(ContactSelectors.SendButton).click();
        await expect(page.getByText('First name is required')).toBeVisible();
        await expect(page.getByText('Last name is required')).toBeVisible();
        await expect(page.getByText('Email is required')).toBeVisible();
        await expect(page.getByText('Subject is required')).toBeVisible();
        await expect(page.getByText('Message is required')).toBeVisible();

    })
})