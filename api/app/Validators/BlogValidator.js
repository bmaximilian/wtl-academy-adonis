/**
 * Created on 25.10.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

class BlogValidator {
    get validateAll() {
        return true;
    }

    async fails(errorMessages) {
        return this.ctx.response.send(errorMessages);
    }
}

module.exports = BlogValidator;
