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
const Factory = use('Factory');
const Config = use('Config');
const Hash = use('Hash');

Factory.blueprint('App/Models/User', async (faker) => {
    return {
        name: faker.username(),
        email: faker.email(),
        password: await Hash.make(Config.get('app.defaultPassword')),
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
