
const BlogValidator = use('App/Validators/BlogValidator');

class StoreComment extends BlogValidator {
    get rules() {
        return {
            message: 'string|required',
            postId: 'number|required',
        };
    }
}

module.exports = StoreComment;
