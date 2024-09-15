import {BasePage} from './base.page';
import {Article} from "../models/article";
import {expect} from "@playwright/test";

export class ArticlePage extends BasePage {
    constructor(page) {
        super(page);
        this.articleHeader = page.locator('.banner h1');
        this.articleContent = page.locator('.article-content p');
        this.articleTags = page.locator('.tag-list');
    }

    // should return article object
    async getArticle() {
        let article = new Article();
        await expect(this.articleHeader).toBeVisible();
        article.title = await this.articleHeader.textContent();
        article.body = await this.articleContent.textContent();
        article.tags = await this.articleTags.textContent();
        article.description = '';
        return article;
    }
}
