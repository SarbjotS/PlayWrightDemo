import { test, expect } from '@playwright/test';
import { LoginSelectors } from '../Selectors/UserLoginSelectors';
import { ContactSelectors } from '../Selectors/ContactSelectors';
import { PurchaseJoruney } from '../Selectors/PurchaseJourneySelectors';



test.describe("Client going through purchase journey",async()=>{

    test.beforeEach(async({page, isMobile,})=>{
    await page.goto('/');
        if (isMobile){
            //await page.locator(LoginSelectors.HamburgerIcon).click();
        }

    })
    test("Client buys a power tool",async({page})=>{
        await page.locator(PurchaseJoruney.CategoriesNavButton).click();
        await page.locator(PurchaseJoruney.PowerTools).click();
        await page.getByText("Sheet Sander").click();
        await page.locator(PurchaseJoruney.IncreaseQuantity).click();
        const price = await page.locator(PurchaseJoruney.UnitPrice).textContent;
        const quantity = await page.locator(PurchaseJoruney.Quantity).textContent;
        await page.locator(PurchaseJoruney.AddToCart).click();
        await page.locator(PurchaseJoruney.CartNavButton).click();
        const totalPrice = await page.locator(PurchaseJoruney.TotalPrice).allInnerTexts;
        const _TotalPrice = Number(price)* Number(quantity);
        await expect(_TotalPrice).toEqual(Number(totalPrice))
        //await expect(PurchaseJoruney.TotalPrice).toEqual(price.+quantity)


    })

    test("Client uses a filter",async({page})=>{

    })

    test("Client purchases a favourited item",async({page})=>{

    })
    
    test("Client buys as an admin",async({page})=>{

    })

    test("Verify number of products via API",async({page})=>{

    })


    

})