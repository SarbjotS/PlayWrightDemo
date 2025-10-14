import { test, expect } from '@playwright/test';
import { LoginSelectors } from '../Selectors/UserLoginSelectors';
import {Login} from '../utils/Login'



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
    });
        
    })
    test('Staff changes the status of a message',async(page)=>{
        
    })
