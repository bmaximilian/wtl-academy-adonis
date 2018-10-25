
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { whitelist } = require('bmax-utils');
const { unset } = require('lodash');

const NotFoundExceptionResponse = use('App/Responses/NotFoundExceptionResponse');
const CommentModel = use('App/Models/Comment');

/**
 * Resourceful controller for interacting with comments
 */
class CommentController {
    /**
     * Transforms the comment for the response
     *
     * @param comment
     * @return {object}
     */
    transform(comment) {
        return whitelist(comment, [
            'id',
            'message',
        ]);
    }

    /**
   * Show a list of all comments.
   * GET comments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async index() {
        const comments = await CommentModel.all();

        return comments.toJSON().map(comment => this.transform(comment));
    }

    /**
   * Create/save a new comment.
   * POST comments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {User} ctx.user
   */
    async store({ request, user }) {
        const commentData = request.only(['message', 'postId']);

        commentData.post_id = commentData.postId;
        commentData.user_id = user.id;

        unset(commentData, 'postId');

        const comment = await CommentModel.create(commentData);
        return this.transform(comment.toJSON());
    }

    /**
   * Display a single comment.
   * GET comments/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
    async show({ params, response }) {
        const comment = await CommentModel.find(params.id);

        if (!comment) {
            const e = new NotFoundExceptionResponse('comment_not_found');
            return e.send(response);
        }

        return this.transform(comment.toJSON());
    }

    /**
   * Update comment details.
   * PUT or PATCH comments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async update({ params, request }) {
        const comment = await CommentModel.find(params.id);
        const commentData = request.only(['message']);

        comment.merge(commentData);

        await comment.save();

        return this.transform(comment.toJSON());
    }

    /**
   * Delete a comment with id.
   * DELETE comments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async destroy({ params }) {
        const comment = await CommentModel.find(params.id);

        await comment.delete();

        return {};
    }
}

module.exports = CommentController;
