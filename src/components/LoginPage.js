import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "./axios"
import '../loginPage.css'

export const Login = ({setToken}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  const handleUserLogin = async (event) => {
    event.preventDefault()
    const getToken = async () => {
      const { token } = await login(username, password)
      localStorage.setItem("EpicGamerTokenForRetrograde",token)
      setToken(token)
    }
    getToken()
    nav('/')
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form id="login" className="user-login" onSubmit={event=>handleUserLogin(event)}>
        <fieldset>
          <legend>Enter Username</legend>
          <input
            placeholder="Enter username"
            onChange={({target: {value}})=>setUsername(value)}
            required
          />
        </fieldset>
        <fieldset>
          <legend>Enter Password</legend>
          <input
            type="password"
            placeholder="Enter password"
            onChange={({target: {value}})=>setPassword(value)}
            required
          />
        </fieldset>
        <input id="logButton" type="submit" value="Login"/>
      </form>
    </div>
  )
}