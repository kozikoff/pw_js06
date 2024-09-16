import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';
import {MainPage, RegisterPage, SettingsPage, EditorPage, ArticlePage, Article} from '../src/pages/index';

const url = 'https://realworld.qa.guru/#/';
let newUser;

test.describe('Page Object', () => {
    test.beforeEach(async ({page}) => {
        newUser = {
            bio: faker.music.genre(),
            email: faker.internet.email(),
            name: faker.person.firstName('female'),
            password: faker.internet.password(),
        };
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        await mainPage.open(url);
        await mainPage.goToRegister();
        await registerPage.register(newUser.name, newUser.email, newUser.password);
    });

    test('Пользователь может изменить bio. Page Object - middle version', async ({page}) => {
        const mainPage = new MainPage(page);
        const settingsPage = new SettingsPage(page);

        await mainPage.goToSettings();
        await settingsPage.updateProfile(newUser.bio);
        let profileInfo = await settingsPage.getProfile();
        await expect(profileInfo.bio).toHaveText(newUser.bio);
    });

    test('A user should be able to publish a new article', async ({page}) => {
        let expectedArticle = new Article();
        let actualArticle;
        const mainPage = new MainPage(page);
        const editorPage = new EditorPage(page);
        const articlePage = new ArticlePage(page);

        await mainPage.goToEditor();
        await editorPage.publishNewArticle(expectedArticle);

        await expect(articlePage.articleHeader).toBeVisible();
        actualArticle = await articlePage.getArticle();
        await expect(actualArticle.title).toEqual(expectedArticle.title);
        await expect(actualArticle.body).toEqual(expectedArticle.body);
        await expect(actualArticle.tags).toEqual(expectedArticle.tags);
    });

    test('A user should be able to open the saved article', async ({page}) => {
        let actualArticle;
        const mainPage = new MainPage(page);
        const articlePage = new ArticlePage(page);

        await expect(mainPage.emptyListMessage).toBeVisible();
        await mainPage.open(url + 'article/bj-rk-gu-mundsd-ttirr');

        await expect(articlePage.articleHeader).toBeVisible();
        actualArticle = await articlePage.getArticle();
        await expect(actualArticle.title).toEqual('Björk Guðmundsdóttirr');
        await expect(actualArticle.body).toEqual('एक जल्दी भूरी लोमड़ी आलसी कुत्ते पर कूदता');
        await expect(actualArticle.tags).toEqual('ipsum');
    });
});
