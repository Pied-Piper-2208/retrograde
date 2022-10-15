import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { register } from "./axios"

import '../css/registerPage.css'

export const Register = ({setToken}) => {
  const nav = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    if(password!==confirmPassword){
      alert("Passwords do not match!")
      return
    }
    const data = await register(username, password, email)
    if(!data.token){
      alert(data.message)
      return
    }
    setToken(data.token)
    nav("/")
  }


  return (
    <div id="container1">
      <h1>Register</h1>
      <form id="registerForm" onSubmit={event=>handleSubmit(event)}>
        <fieldset>
          <legend>Enter User Info</legend>
          <input
            placeholder="Enter username"
            onChange={event => setUsername(event.target.value)}
            required
          />
          <input
            placeholder="Enter email"
            onChange={event => setEmail(event.target.value)}
            required
          />
        </fieldset>
        <fieldset>
          <legend>Select Password</legend>
          <input
            type="password"
            placeholder="Enter password"
            onChange={event => setPassword(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            onChange={event => setConfirmPassword(event.target.value)}
            required
            />
        </fieldset>
        <input id="registerButton" type="submit" value="Sign Up!"/>
      </form>
    </div>
  )
}