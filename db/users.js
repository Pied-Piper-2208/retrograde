const client = require('./client');
const bcrypt = require('bcrypt');


const createUser = async ({ username, password, emailAddress, isAdmin }) => {
    try {
        console.log('emailAddress', emailAddress);
        const SALT_COUNT = 10;

        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        const { rows: [user] } = await client.query(`
            INSERT INTO users(username, password, "emailAddress", "isAdmin")
            VALUES($1, $2, $3, $4)
            ON CONFLICT (username, "emailAddress") DO NOTHING
            RETURNING *;
        `, [username, hashedPassword, emailAddress, isAdmin])

        return user;
    } catch (error) {
        console.error('Error creating user!')
        throw error;
    }
};

const getUser = async ({ username, password }) => {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
  
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (isValid) {
      return user;
    } else {
      return ("Password is not correct");
    }
}
  
const getUserById = async (userId) => {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE id=$1;
    `, [userId]);

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

const getUserByUsername = async (userName) => {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1;
    `, [userName]);

    return user;
  } catch (error) {
    throw error;
  }
}

const getAllUsers = async () => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM users;
    `)
    return rows
  } catch (error) {
    throw error
  }
}

module.exports = { 
    createUser,
    getUser,
    getUserById,
    getUserByUsername, 
    getAllUsers
  };