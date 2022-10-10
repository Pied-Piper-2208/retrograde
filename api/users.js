const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getUserByUsername, createUser, getUserById, getAllUsers} = require('../db');



router.use((req, res, next) => {
    console.log("A request is being made to /users");
  
    next();
    
  });
  
  // POST /api/users/login
router.post('/login', async (req, res, next) => {

    const { username, password } = req.body;
    console.log("username/password is ", username, password);
    //console.log("req is ", req);
    
    // request must have both
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    }

    const user = await getUserByUsername(username);
    if( user ) {
    try {
        
        const hashedPassword = user.password;
        const isValid = await bcrypt.compare(password, hashedPassword);

        if (user && isValid) {
          // create token & return to user
          const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
          req.user = user;
          res.send({ success: true, user: user, message: "you're logged in!", token: token });
        } else {
          next({ 
            name: 'IncorrectCredentialsError', 
            message: 'Username or password is incorrect'
          });
        }
      } catch(error) {
        console.log(error);
        next(error);
      }
    } else {
      next({ 
        name: 'NoSuchUserError', 
        message: 'There is no user by that name. Please register'
      });
    }
    });  

    // POST /api/users/register
router.post('/register', async (req, res, next) => {

    const { username, password, emailAddress } = req.body;
  
    try {
      const _user = await getUserByUsername(username);
      
      if(_user) {
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      }
      console.log('email', emailAddress);
      const user = await createUser({username, password, emailAddress});
      console.log('user', user);
      const token = jwt.sign({id: user.id, username}, process.env.JWT_SECRET, {expiresIn: '1w'});
      res.send({success: true, user: user, message: "Thank you for signing up", token});
    } catch ({ name, message }) {
        console.log('error', message);
      next({ name, message})
    }
  });
  
router.get('/', async (req, res) => {
    try {
      const allUsers = await getAllUsers()
      res.send(allUsers)
    } catch (error) {
      throw error
    }
})

  module.exports = router;
