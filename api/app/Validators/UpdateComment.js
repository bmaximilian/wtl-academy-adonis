
const BlogValidator = use('App/Validators/BlogValidator');

class UpdateComment extends BlogValidator {
    get rules() {
        return {
            message: 'string|required',
        };
    }
}

module.exports = UpdateComment;
