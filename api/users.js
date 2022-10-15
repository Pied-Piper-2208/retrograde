const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { getUserByUsername, createUser, getAllUsers, getUserById} = require('../db')

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password){
      res.send({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      })
    }

    try {
      const user = await getUserByUsername(username);

      if(!user){
        res.send({ 
          name: 'NoSuchUserError', 
          message: 'There is no user by that name. Please register'
        })
      }

      const hashedPassword = user.password;
      const isValid = await bcrypt.compare(password, hashedPassword)

      if (!isValid){
        res.send({ 
          name: 'IncorrectCredentialsError', 
          message: 'Username or password is incorrect'
        })
      }
      
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET)
      res.send({ success: true, user, message: "you're logged in!", token })

      } catch(error) {
        res.send({
          name: 'TryCatchFailure',
          message: 'Something happened in the try/catch',
          error
        })
        throw error
      }
})

router.post('/register', async (req, res) => {

    const { username, password, emailAddress } = req.body
  
    try {
      const _user = await getUserByUsername(username)
      
      if(_user) {
        res.send({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      }

      const user = await createUser({username, password, emailAddress});
      const token = jwt.sign({id: user.id, username}, process.env.JWT_SECRET, {expiresIn: '1w'});
      res.send({success: true, user, message: "Thank you for signing up", token})
    } catch (error) {
      res.send({
        name: 'TryCatchFailure',
        message: 'Something happened in the try/catch',
        error
      })
      throw error
    }
})

router.get('/me', async (req, res) => {
  try {
    res.send(req.user)
  } catch (error) {
    throw error
  }
})

router.get('/', async (req, res) => {
    try {
      const allUsers = await getAllUsers()
      res.send(req.user.isAdmin ? allUsers : {})
    } catch (error) {
      throw error
    }
})

module.exports = router
