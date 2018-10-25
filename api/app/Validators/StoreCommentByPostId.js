
const BlogValidator = use('App/Validators/BlogValidator');

class StoreComment extends BlogValidator {
    get rules() {
        return {
            message: 'string|required',
        };
    }
}

module.exports = StoreComment;
