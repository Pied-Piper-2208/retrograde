import { useEffect } from "react";
import { login } from "./axios";

export const Login = ({setToken}) => {

  const handleUserLogin = async (event) => {
    event.preventDefault();
    const username = event.target[0].value
    const password = event.target[1].value
    useEffect(()=>{
      login({username, password})
      .then(results=>setToken(results.token))
    },[])
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form id="login" className="user-login" onSubmit={event=>handleUserLogin(event)}>
        <label>Username: </label>
        <input
          placeholder="Enter username"
          required
        /><br/>
        <label>Password: </label>
        <input
          type="password"
          placeholder="Enter password"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          required
        /><br/>
        <input type="submit" value="Login"/>
      </form>
    </div>
  );
}