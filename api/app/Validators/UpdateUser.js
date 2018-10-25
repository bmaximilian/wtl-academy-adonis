
const BlogValidator = use('App/Validators/BlogValidator');

class UpdateUser extends BlogValidator {
    get rules() {
        const { id } = this.ctx.request.params;

        return {
            name: `string|required|unique:users,id,${id}`,
            email: `string|required|email|unique:users,id,${id}`,
        };
    }

    get messages() {
        return {
            'email.unique': 'This email is already registered.',
            'name.unique': 'This name is already taken.',
        };
    }
}

module.exports = UpdateUser;
