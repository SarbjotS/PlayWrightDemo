import { LoginSelectors } from "../Selectors/UserLoginSelectors";
import {Page} from '@playwright/test'

export class ShippingAddress{
    constructor(private page: Page){}


    async DeliveryAddress(){
        await this.page.locator(LoginSelectors.Street).fill('12 Cookie Street');
        await this.page.locator(LoginSelectors.PostalCode).fill('1234');
        await this.page.locator(LoginSelectors.City).fill('Auckland');
        await this.page.locator(LoginSelectors.State).fill('Auckland');
        await this.page.locator(LoginSelectors.Country).fill('NZ');
    }

}