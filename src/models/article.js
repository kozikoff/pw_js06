import {faker} from '@faker-js/faker';

export class Article {
    constructor() {
        this.body = faker.lorem.paragraph();
        this.description = faker.lorem.sentence();
        this.tags = faker.lorem.word();
        this.title = faker.lorem.sentence();
    }
}
