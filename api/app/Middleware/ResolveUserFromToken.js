
/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { startsWith } = require('lodash');

const UserModel = use('App/Models/User');
const NotAllowedExceptionResponse = use('App/Responses/NotAllowedExceptionResponse');
const NotFoundExceptionResponse = use('App/Responses/NotFoundExceptionResponse');

class ResolveUserFromToken {
    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async handle(ctx, next) {
        let token = ctx.request.header('token');

        if (!token) {
            const e = new NotAllowedExceptionResponse();
            return e.send(ctx.response);
        }

        const prefix = 'token: ';
        if (startsWith(prefix, token)) {
            token = token.substring(prefix.length, token.length);
        }

        const user = await UserModel.findBy('token', token);

        if (!user) {
            const e = new NotFoundExceptionResponse('user_not_found');
            return e.send(ctx.response);
        }

        ctx.user = user;

        await next();
    }
}

module.exports = ResolveUserFromToken;
