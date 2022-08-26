'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async random(ctx) {
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.question.search(ctx.query);
        } else {
            entities = await strapi.services.question.find(ctx.query);
        }
        const randomId = Math.floor( Math.random() * entities.length );

        // return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.question }));
        return  sanitizeEntity(entities[ randomId ], { model: strapi.models.question });
    },
};
