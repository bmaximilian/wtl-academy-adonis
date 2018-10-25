class StoreUser {
    get rules() {
        return {
            name: 'string|required|unique:users',
            email: 'string|required|email|unique:users',
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

module.exports = StoreUser;
