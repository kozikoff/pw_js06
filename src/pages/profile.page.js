import {BasePage} from "./base.page";

export class ProfilePage extends BasePage {
    constructor(page) {
        super(page);
        this.articleHeaders = page.locator('.article-preview h1');
        this.favoriteArticleLink = page.getByRole('link', {name: 'Favorited Articles'});
    }

    async getArticleHeaders() {
        return await this.articleHeaders.allInnerTexts();
    }

    async goToFavoriteArticles() {
        await this.favoriteArticleLink.click();
    }
}
