const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentToken");
  };
  
  const LogoutButton = () => {
    return (
      <button className="logout" onClick={() => logout()}>
        Logout
      </button>
    );
  };
  
  export default logout;