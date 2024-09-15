import {BasePage} from "./base.page";
import {expect} from "@playwright/test";

export class ProfilePage extends BasePage {
    constructor(page) {
        super(page);
        this.articleHeaders = page.locator('.article-preview h1');
        this.favoriteArticleLink = page.getByRole('link', {name: 'Favorited Articles'});
    }

    async getArticleHeaders() {
        await expect(this.articleHeaders.first()).toBeVisible();
        return await this.articleHeaders.allInnerTexts();
    }

    async goToFavoriteArticles() {
        await this.favoriteArticleLink.click();
    }
}
