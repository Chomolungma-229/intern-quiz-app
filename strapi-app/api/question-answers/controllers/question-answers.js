'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async getCorrectAnswerRateByUserId(ctx) {
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.question_answers.search(ctx.query);
        } else {
            entities = await strapi.services.question_answers.find(ctx.query);
        }
        const randomId = Math.floor(Math.random() * entities.length);

        // return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.question }));
        return sanitizeEntity(entities[randomId], { model: strapi.models.question_answers });
    },
    //Java
    //JS
    //Pythonの答えを持って来る
    async getLanguageAnswer(ctx) {
        let entities;
        entities = await strapi.services.question_answers.find({ q_: 'my search query', date_gt: '2022-10-12' });
        return entities;
    },
    //正答率を求める関数
    async getCorrectAnswerRate(ctx) {
        entities = await strapi.services.question_answers.find(ctx.query);

    }
};
