
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
    up() {
        this.create('users', (table) => {
            table.increments();
            table.string('name').notNullable().unique();
            table.string('email', 254).notNullable().unique();
            table.string('password').notNullable();
            table.string('token').unique();
            table.timestamps();
        });
    }

    down() {
        this.drop('users');
    }
}

module.exports = UserSchema;
