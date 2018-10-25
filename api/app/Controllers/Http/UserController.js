/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { whitelist } = require('bmax-utils');

const Config = use('Config');
const NotFoundExceptionResponse = use('App/Responses/NotFoundExceptionResponse');
const UserModel = use('App/Models/User');

/**
 * Resourceful controller for interacting with posts
 */
class UserController {
    /**
     * Transforms the user for the response
     *
     * @param user
     * @return {object}
     */
    transform(user) {
        return whitelist(user, [
            'id',
            'name',
            'email',
        ]);
    }

    /**
     * Show a list of all users.
     * GET users
     */
    async index() {
        const users = await UserModel.all();

        return users.toJSON().map(user => this.transform(user));
    }

    /**
     * Create/save a new user.
     * POST users
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     */
    async store({ request }) {
        const userData = request.only(['name', 'email', 'password']);

        if (!userData.password) {
            userData.password = Config.get('app.defaultPassword');
        }

        const user = await UserModel.create(userData);

        return this.transform(user.toJSON());
    }

    /**
     * Display a single user.
     * GET users/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.params
     * @param {Response} ctx.response
     */
    async show({ params, response }) {
        const user = await UserModel.find(params.id);

        if (!user) {
            const e = new NotFoundExceptionResponse('user_not_found');
            return e.send(response);
        }

        return this.transform(user.toJSON());
    }

    /**
     * Render a form to update an existing user.
     * GET users/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit() {}

    /**
     * Update user details.
     * PUT or PATCH users/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update() {}

    /**
     * Delete a user with id.
     * DELETE users/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy() {}
}

module.exports = UserController;
