import { test, expect } from '@playwright/test';
import { LoginSelectors } from '../Selectors/UserLoginSelectors';



test.describe('User login scenarios',()=>{
    test.beforeEach(async({page})=>{
        await page.goto('/');
    })
    test('UserRegister',async ({page})=>{
        await page.getByTestId('nav-sign-in').click();
        await expect(page.locator('h3')).toHaveText('Login');
        await page.getByTestId('register-link').click();
        //Form for registering a new account
        await page.locator(LoginSelectors.FirstName).fill('John');
        await page.locator(LoginSelectors.LastName).fill('Snow');
        await page.locator(LoginSelectors.DateOfBirth).fill('1992-10-12');
        await page.locator(LoginSelectors.Street).fill('12 Cookie Street');
        await page.locator(LoginSelectors.PostalCode).fill('1234');
        await page.locator(LoginSelectors.City).fill('Auckland');
        await page.locator(LoginSelectors.City).fill('Auckland');
        await page.locator(LoginSelectors.Country).selectOption('AO');
        await page.locator(LoginSelectors.Phone).fill('1234567');
        await page.locator(LoginSelectors.Email).fill((Math.random() + 1).toString(36).substring(7) + "@grr.la");
        await page.locator(LoginSelectors.Password).fill('Test12!a');
        await page.locator('[data-test="register-submit"]').click();
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    })

    test('UserLogin',async({page})=>{
        await page.getByTestId('nav-sign-in').click();
        await expect(page.locator('h3')).toHaveText('Login');   
        await page.locator(LoginSelectors.Email).fill(process.env.CLIENT_USER_LOGIN || '')
        await page.locator(LoginSelectors.Password).fill(process.env.CLIENT_PASSWORD || '')
        await page.locator(LoginSelectors.SignInLogin).click();
        await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();
    })

})