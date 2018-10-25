
class UpdateUser {
    get rules() {
        const { id } = this.ctx.request.params;

        return {
            name: `string|required|unique:users,id,${id}`,
            email: `string|required|email|unique:users,id,${id}`,
        };
    }

    get validateAll() {
        return true;
    }

    get messages() {
        return {
            'email.unique': 'This email is already registered.',
            'name.unique': 'This name is already taken.',
        };
    }

    async fails(errorMessages) {
        return this.ctx.response.send(errorMessages);
    }
}

module.exports = UpdateUser;
