import { test, expect } from '@playwright/test';
import { LoginSelectors } from '../Selectors/UserLoginSelectors';
import { ContactSelectors } from '../Selectors/ContactSelectors';



test.describe("Client going through purchase journey",async()=>{

    test.beforeEach(async({page, isMobile,})=>{
    await page.goto('/');
        if (isMobile){
            //await page.locator(LoginSelectors.HamburgerIcon).click();
        }

    })
    test("Client buys a power tool",async({page})=>{

    })

    test("Client uses a filter",async({page})=>{

    })

    test("Client purchases a favourited item",async({page})=>{

    })
    
    test("Client buys as an admin",async({page})=>{

    })

    

})