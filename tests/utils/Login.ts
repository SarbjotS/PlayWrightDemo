import { LoginSelectors } from "../Selectors/UserLoginSelectors";
import {Page} from '@playwright/test'
import { PurchaseJoruney } from '../Selectors/PurchaseJourneySelectors';


export class Login{
    constructor(private page: Page){}

    async NavToLoginPage(){
        await this.page.getByTestId('nav-sign-in').click();
    }

    async Login(email:string, password:string){
        await this.page.locator(LoginSelectors.Email).fill(email)
        await this.page.locator(LoginSelectors.Password).fill(password)
        await this.page.locator(LoginSelectors.SignInLogin).click();
    }

    async GuestLogin(){
        await this.page.locator(PurchaseJoruney.GuestEmail).fill((Math.random() + 1).toString(36).substring(7) + "@grr.la");
        await this.page.locator(PurchaseJoruney.GuestFirstName).fill("John");
        await this.page.locator(PurchaseJoruney.GuestLastName).fill("Smith");
        await this.page.locator(PurchaseJoruney.GuestSubmit).click();
    }

}