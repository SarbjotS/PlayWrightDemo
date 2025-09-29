import { test, expect } from '@playwright/test';
import { LoginSelectors } from '../Selectors/UserLoginSelectors';

test.describe("Client Sends a message",()=>{
    test.beforeEach(async({page,isMobile})=>{
        await page.goto('/');
        if (isMobile){
            await page.locator(LoginSelectors.HamburgerIcon).click();
        }
    })

    test('User sends a message with an attachment', async({page})=>{


    })

    test('Verify error states on contact page', async(page) =>{
        
    })

    test('Verify signed in user can send a message',async(page)=>{
        
    })
})