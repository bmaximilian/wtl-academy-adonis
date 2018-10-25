
/*
 |--------------------------------------------------------------------------
 | DatabaseSeeder
 |--------------------------------------------------------------------------
 |
 | Make use of the Factory instance to seed database with dummy data or
 | make use of Lucid models directly.
 |
 */

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Logger = use('Logger');

class DatabaseSeeder {
    async run() {
        const user = await Factory.model('App/Models/User').create();
        Logger.info('Added user');

        const posts = await Factory.model('App/Models/Post').makeMany(3);

        await user.posts().saveMany(posts);
        Logger.info('Added posts');

        await Promise.all(posts.map(async (post) => {
            let comments = await Factory.model('App/Models/Comment').makeMany(5);

            comments = comments.map((comment) => {
                comment.user_id = user.id;

                return comment;
            });

            await post.comments().saveMany(comments);
            Logger.info('Added comments to post');

            return Promise.resolve();
        }));
    }
}

module.exports = DatabaseSeeder;
