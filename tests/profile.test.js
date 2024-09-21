import {expect, test} from '@playwright/test';
import {LoginPage, ProfilePage, MainPage} from '../src/pages/index';

const url = 'https://realworld.qa.guru/#/';
const user = {
    email: 'johnSmith@gmail.com',
    password: 'GCVstxOZhIG0rK#gmP#4'
}

test.describe('Profile tests', () => {
    test.beforeEach(async ({page}) => {
        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);

        await mainPage.open(url);
        await mainPage.goToLogin();

        await loginPage.login(user.email, user.password);
    });

    test('A user should be able to view his published articles on the profile page', async ({page}) => {
        const mainPage = new MainPage(page);
        const profilePage = new ProfilePage(page);
        await expect(mainPage.emptyListMessage).toBeVisible();

        await mainPage.open(url + 'profile/John%20Smith');
        await expect(profilePage.articleHeaders.first()).toBeVisible();
        await expect(await profilePage.getArticleHeaders()).toEqual(['Björk Guðmundsdóttirr', 'Björk Guðmundsdóttir']);
    });

    test('A user should be able to view his favorite articles on the profile page', async ({page}) => {
        const mainPage = new MainPage(page);
        const profilePage = new ProfilePage(page);
        await expect(mainPage.emptyListMessage).toBeVisible();

        await mainPage.open(url + 'profile/John%20Smith');
        await profilePage.goToFavoriteArticles();
        await expect(profilePage.articleHeaders.first()).toBeVisible();
        await expect(await profilePage.getArticleHeaders()).toEqual(['Björk Guðmundsdóttirr']);
    });
});
