
const BlogValidator = use('App/Validators/BlogValidator');

class StorePost extends BlogValidator {
    get rules() {
        return {
            message: 'string|required',
        };
    }
}

module.exports = StorePost;
