/*
 |--------------------------------------------------------------------------
 | Factory
 |--------------------------------------------------------------------------
 |
 | Factories are used to define blueprints for database tables or Lucid
 | models. Later you can use these blueprints to seed your database
 | with dummy data.
 |
 */

/** @type {import('@adonisjs/lucid/src/Factory')} */
const crypto = require('crypto');

const Factory = use('Factory');
const Config = use('Config');

Factory.blueprint('App/Models/User', async (faker) => {
    return {
        name: faker.username(),
        email: faker.email(),
        password: Config.get('app.defaultPassword'),
        token: crypto.randomBytes(Config.get('app.tokenLength') / 2).toString('hex'),
    };
});

Factory.blueprint('App/Models/Post', (faker) => {
    return {
        message: faker.sentence(),
    };
});

Factory.blueprint('App/Models/Comment', (faker) => {
    return {
        message: faker.sentence(),
    };
});
