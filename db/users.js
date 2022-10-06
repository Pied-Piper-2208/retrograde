const client = require('./index');

const createUser = async ({ username, password, emailAddress, isAdmin }) => {
    try {
        const { rows: [user] } = await client.query(`
            INSERT INTO users(username, password, "emailAddress", "isAdmin")
            VALUES($1, $2, $3, $4)
            ON CONFLICT (username, "emailAddress") DO NOTHING
            RETURNING *;
        `, [username, password, emailAddress, isAdmin])

        return user;
    } catch (error) {
        console.error('Error creating user!')
        throw error;
    }
};

module.exports = { createUser };