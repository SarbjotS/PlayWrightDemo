import { test, expect } from '@playwright/test';
import { LoginSelectors } from '../Selectors/UserLoginSelectors';
import { PurchaseJoruney } from '../Selectors/PurchaseJourneySelectors';
import { Login } from '../utils/Login'
import { ShippingAddress } from '../utils/ShippingAddress';
import {PaymentMethods} from '../utils/PaymentMethods'



test.describe("Client going through purchase journey",async()=>{

    test.beforeEach(async({page, isMobile,})=>{
    await page.goto('/');
        if (isMobile){
            //await page.locator(LoginSelectors.HamburgerIcon).click();
        }

    })
    test("Client buys a power tool",async({page})=>{
        const GuestUser = new Login(page);        
        const shippingaddress = new ShippingAddress(page);
        const PaymentMethod = new PaymentMethods(page);

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
        GuestUser.GuestLogin();
        await page.getByText("Proceed to checkout").nth(1).click();
        shippingaddress.DeliveryAddress();
        await page.getByText("Proceed to checkout").nth(2).click();
        PaymentMethod.CashOnDelivery();
        await page.getByText("Confirm").click();
        await expect(page.getByText("Payment was successful")).toBeVisible();


    })
    
    test("Client buys as an admin",async({page})=>{
        const StaffLogin = new Login(page);
        const shippingaddress = new ShippingAddress(page);
        const PaymentMethod = new PaymentMethods(page);

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
        await StaffLogin.Login(process.env.STAFF_USER_LOGIN || '', process.env.STAFF_PASSWORD || '');
        await page.getByText("Proceed to checkout").nth(1).click();
        shippingaddress.DeliveryAddress();

        await page.getByText("Proceed to checkout").nth(2).click();
        await PaymentMethod.CreditCard();
        await page.getByText("Confirm").click();
        await expect(page.getByText("Payment was successful")).toBeVisible();
    })

    test("Verify number of products via API",async({page, request})=>{

        await page.locator(PurchaseJoruney.CategoriesNavButton).click();
        await page.locator(PurchaseJoruney.PowerTools).click();
        const response = await request.get('https://api.practicesoftwaretesting.com/products?page=1&by_category_slug=power-tools');
        expect (response.ok()).toBeTruthy();
        const body = await response.json();
        const total = body.total
        console.log('Total Products: ', total);
        expect(total).toBeDefined();





    })


    

})