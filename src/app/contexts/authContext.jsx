// @ts-check
import React, { createContext, useState, useMemo } from 'react';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const initState = JSON.parse(localStorage.getItem('userId'));

  const [loggedIn, setLoggedIn] = useState(initState);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn(data);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(null);
  };

  const valueProvider = useMemo(() => (
    { logIn, logOut, loggedIn }
  ), [logIn, logOut, loggedIn]);

  return (
    <AuthContext.Provider value={valueProvider}>
      { children }
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
