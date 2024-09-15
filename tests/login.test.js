import {expect, test} from '@playwright/test';
import {MainPage} from '../src/pages/index';
import {LoginPage} from "../src/pages/login.page";

const url = 'https://realworld.qa.guru/#/';

test.describe('Login tests', () => {
    test('The system should show an error when a user uses a wrong username and password combination', async ({page}) => {
        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);

        await mainPage.open(url);
        await mainPage.goToLogin();

        await loginPage.login('johnSmith@gmail.com', 'wrongPassword');
        await expect(await loginPage.getErrorMessage()).toEqual('Wrong email/password combination');
    });
});
