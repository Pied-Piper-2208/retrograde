const client = require('./client');
const bcrypt = require('bcrypt');


const createUser = async ({ username, password, emailAddress, isAdmin }) => {
    try {
        console.log('emailAddress', emailAddress);
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

async function getUser({ username, password }) {

    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
  
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (isValid) {
      return user;
    } else {
      return ("Password is not correct");
    }
  
  }
  
  async function getUserById(userId) {
  
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
  
  async function getUserByUsername(userName) {
  
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

module.exports = { 
    createUser,
    getUser,
    getUserById,
    getUserByUsername, };