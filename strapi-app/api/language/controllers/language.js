'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async getLanguage(ctx) {
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.language.search(ctx.query);
        } else {
            entities = await strapi.services.language.find(ctx.query);
        }

        // return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.question }));
        return sanitizeEntity(entities, { model: strapi.models.language });
    },
};
