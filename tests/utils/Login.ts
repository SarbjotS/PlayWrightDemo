import { LoginSelectors } from "../Selectors/UserLoginSelectors";
import {Page} from '@playwright/test'

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

}