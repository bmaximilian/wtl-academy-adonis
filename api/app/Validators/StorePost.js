
class StorePost {
    get rules() {
        return {
            message: 'string|required',
        };
    }

    get validateAll() {
        return true;
    }

    async fails(errorMessages) {
        return this.ctx.response.send(errorMessages);
    }
}

module.exports = StorePost;
