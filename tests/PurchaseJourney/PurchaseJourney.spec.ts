import { test, expect } from '@playwright/test';
import { LoginSelectors } from '../Selectors/UserLoginSelectors';
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

        const Price = await page.locator(PurchaseJoruney.UnitPrice).textContent();
        await page.locator(PurchaseJoruney.AddToCart).click();
        await page.locator(PurchaseJoruney.CartNavButton).click();
        const Quantity = await page.locator(PurchaseJoruney.ProductPageQuantity).inputValue();
        const TotalPrice = "$" + Number(Price)* Number(Quantity);
        const ShownPrice = await page.locator(PurchaseJoruney.TotalPrice).textContent();
        expect(TotalPrice).toEqual(ShownPrice);
        await page.getByText("Proceed to checkout").first().click();
        await page.getByText("Continue as Guest").first().click();
        await page.locator(PurchaseJoruney.GuestEmail).fill((Math.random() + 1).toString(36).substring(7) + "@grr.la");
        await page.locator(PurchaseJoruney.GuestFirstName).fill("John");
        await page.locator(PurchaseJoruney.GuestLastName).fill("Smith");
        await page.locator(PurchaseJoruney.GuestSubmit).click();
        await page.getByText("Proceed to checkout").nth(1).click();
        
        await page.locator(LoginSelectors.Street).fill('12 Cookie Street');
        await page.locator(LoginSelectors.PostalCode).fill('1234');
        await page.locator(LoginSelectors.City).fill('Auckland');
        await page.locator(LoginSelectors.State).fill('Auckland');
        await page.locator(LoginSelectors.Country).fill('NZ');
        await page.getByText("Proceed to checkout").nth(2).click();
        await page.locator(PurchaseJoruney.PaymentMethod).selectOption("Cash on Delivery")
        await page.getByText("Confirm").click();
        await expect(page.getByText("Payment was successful")).toBeVisible();
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