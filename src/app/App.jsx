// @ts-check
import { has } from 'lodash';
import React, { useState, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';

import Login from './components/pages/Login.jsx';
import NoMatch from './components/pages/NoMatch.jsx';
import Chat from './components/pages/Chat.jsx';

import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(has(localStorage, 'userId'));

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const AuthContextProviderValue = useMemo(() => (
    { logIn, logOut, loggedIn }
  ), [logIn, logOut, loggedIn]);

  return (
    <AuthContext.Provider value={AuthContextProviderValue}>
      { children }
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
}

function AuthButton() {
  const auth = useAuth();
  return auth.loggedIn && <Button onClick={auth.logOut}>Выйти</Button>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar variant="light" bg="white" expand="lg" className="shadow-sm">
          <div className="container">
            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
            <AuthButton />
          </div>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            )}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
