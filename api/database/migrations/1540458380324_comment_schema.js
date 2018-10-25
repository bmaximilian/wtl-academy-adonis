
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CommentSchema extends Schema {
    up() {
        this.create('comments', (table) => {
            table.increments();

            table.string('message').notNullable();
            table.integer('post_id').unsigned().notNullable()
            .references('id')
            .inTable('posts');
            table.integer('creator_id').unsigned().notNullable()
            .references('id')
            .inTable('users');

            table.timestamps();
        });
    }

    down() {
        this.drop('comments');
    }
}

module.exports = CommentSchema;
