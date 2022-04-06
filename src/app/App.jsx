// @ts-check
import { has } from 'lodash';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';

import LoginPage from './components/pages/LoginPage.jsx';
import NoMatchPage from './components/pages/NoMatchPage.jsx';
import ChatPage from './components/pages/ChatPage.jsx';

import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(has(localStorage, 'userId'));

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ logIn, logOut, loggedIn }}>
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
                <ChatPage />
              </PrivateRoute>
            )}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
