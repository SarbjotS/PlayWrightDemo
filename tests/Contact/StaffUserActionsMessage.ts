import { test, expect } from '@playwright/test';
import { LoginSelectors } from '../Selectors/UserLoginSelectors';

test.describe('Staff user actions a message',()=>{
    test.beforeEach(async({page, isMobile})=>{
        await page.goto('/');
        if (isMobile){
            await page.locator(LoginSelectors.HamburgerIcon).click();
        }
    })

    test('Staff user validates new message', async(page)=>{

    })
    test('Staff changes the status of a message',async(page)=>{
        
    })

})