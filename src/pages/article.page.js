import {BasePage} from './base.page';
import {Article} from "../models/article";

export class ArticlePage extends BasePage {
    constructor(page) {
        super(page);
        this.articleHeader = page.locator('.banner h1');
        this.articleContent = page.locator('.article-content p');
        this.articleTags = page.locator('.tag-list');
    }

    async getArticle() {
        let article = new Article();
        article.title = await this.articleHeader.textContent();
        article.body = await this.articleContent.textContent();
        article.tags = await this.articleTags.textContent();
        article.description = '';
        return article;
    }
}
