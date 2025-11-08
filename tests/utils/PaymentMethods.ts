import { LoginSelectors } from "../Selectors/UserLoginSelectors";
import {Page} from '@playwright/test'
import { PurchaseJoruney } from '../Selectors/PurchaseJourneySelectors';


export class PaymentMethods{
    constructor(private page: Page){}

    async CashOnDelivery(){
        await this.page.locator(PurchaseJoruney.PaymentMethod).selectOption("Cash on Delivery")
        
    }

    async CreditCard(){
        await this.page.locator(PurchaseJoruney.CreditCardNumber).fill('4111-1111-1111-1111');
        await this.page.locator(PurchaseJoruney.CreditCardExpirey).fill('11/30')
        await this.page.locator(PurchaseJoruney.CreditCardCVV).fill('241')
        await this.page.locator(PurchaseJoruney.CreditCardName).fill('John Smith')

    }

}