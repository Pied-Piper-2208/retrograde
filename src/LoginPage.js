import React from "react";
import { useNavigate } from "react-router-dom";
import { storeCurrentUser, storeCurrentToken } from './auth';


const Login = () => {

  let UserName = '';
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleUserLogin = async () => {
    const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
          }
        )
    });
    
    const data = await response.json();
    
    if (!data.success) {
        alert(data.message);
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("username").focus();
    } else {
        alert(data.message);
        storeCurrentUser(data.user);
        storeCurrentToken(data.token);
        navigate('/');  
     }
}

const saveUsername = () => {

  UserName = document.getElementById("username").value;

}

  return (
    <div className="container">
      <h1>Login</h1>
      <form id="login" className="user-login" onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          name="username"
          onBlur={saveUsername}
          type="text"
          placeholder="Enter username"
          required
        ></input>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          required
        ></input>
        <input type="submit" onClick={handleUserLogin} value="Login"></input>
      </form>
    </div>
  );
};

export default Login;