
const BlogValidator = use('App/Validators/BlogValidator');

class StoreUser extends BlogValidator {
    get rules() {
        return {
            name: 'string|required|unique:users',
            email: 'string|required|email|unique:users',
        };
    }

    get messages() {
        return {
            'email.unique': 'This email is already registered.',
            'name.unique': 'This name is already taken.',
        };
    }
}

module.exports = StoreUser;
