process.chdir(__dirname);
process.env.NODE_ENV = process.env.NODE_ENV ||'development';

module.exports = {
    root: true,
    env: {
        node: true,
    },
    globals: {
        use: true,
    },
    extends: ['airbnb-base'],
    rules: {
        'import/extensions': ['error', 'always', {
            'js': 'never',
        }],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
        // allow console during development
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 1,
        'no-trailing-spaces': 'error',
        'no-param-reassign': [2, { 'props': false }],
        'class-methods-use-this': [0],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'always',
        ],
        indent: ['error', 4, {
            MemberExpression: 0,
            SwitchCase: 1,
        }],
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 1 }],
        // 'valid-jsdoc': 'error',
        'arrow-body-style': 'off',
        'max-len': ['error', { 'code': 120 }],
        /* 'require-jsdoc': ['error', {
            require: {
                FunctionDeclaration: true,
                MethodDefinition: true,
                ClassDeclaration: true,
                ArrowFunctionExpression: true,
                FunctionExpression: true,
            },
        }], */
        'prefer-destructuring': ['error', {
            VariableDeclarator: {
                array: true,
                object: true
            },
            AssignmentExpression: {
                array: false,
                object: false,
            },
        }, {
            'enforceForRenamedProperties': false
        }]
    },
};
