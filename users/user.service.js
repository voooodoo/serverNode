const config = require('config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, email: 'test@test', password: 'test', firstName: 'Test', lastName: 'User' },
    { id: 2, username: 'test2', password: 'test2', firstName: 'Test2', lastName: 'User2'} ];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ email, password }) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
