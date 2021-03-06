
const BlogValidator = use('App/Validators/BlogValidator');

class UpdatePost extends BlogValidator {
    get rules() {
        return {
            message: 'string|required',
        };
    }
}

module.exports = UpdatePost;
