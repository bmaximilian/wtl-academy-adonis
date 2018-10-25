
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { whitelist } = require('bmax-utils');

const NotFoundExceptionResponse = use('App/Responses/NotFoundExceptionResponse');
const PostModel = use('App/Models/Post');

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
    /**
     * Transforms the post for the response
     *
     * @param post
     * @return {object}
     */
    transform(post) {
        const whitelistedPost = whitelist(post, [
            'id',
            'message',
            'email',
            'comments',
        ]);

        if (whitelistedPost.comments) {
            whitelistedPost.comments = whitelistedPost.comments.map((comment) => {
                return whitelist(comment, [
                    'message',
                    'id',
                ]);
            });
        }

        if (post.creator) {
            whitelistedPost.author = whitelist(post.creator, [
                'id',
                'name',
                'email',
            ]);
        }

        return whitelistedPost;
    }

    /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async index() {
        const posts = await PostModel
        .query()
        .with('comments')
        .with('creator')
        .fetch();

        return {
            posts: posts.toJSON().map(post => this.transform(post)),
        };
    }

    /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Request} ctx.user
   * @param {Response} ctx.response
   */
    async store({ request, user }) {
        const postData = request.only(['message']);

        postData.user_id = user.id;

        const post = await PostModel.create(postData);
        post.creator = user.toJSON();

        return this.transform(post.toJSON());
    }

    /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async show({ params, response }) {
        const posts = await PostModel
        .query()
        .where('id', params.id)
        .with('comments')
        .with('creator')
        .fetch();

        const post = posts.first();

        if (!post) {
            const e = new NotFoundExceptionResponse('post_not_found');
            return e.send(response);
        }

        return this.transform(post.toJSON());
    }

    /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async update({ params, request }) {
        const post = await PostModel.find(params.id);
        const postData = request.only(['message']);

        post.merge(postData);

        await post.save();

        return this.transform(post.toJSON());
    }

    /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async destroy({ params }) {
        const post = await PostModel.find(params.id);

        await post.delete();

        return {};
    }
}

module.exports = PostController;
