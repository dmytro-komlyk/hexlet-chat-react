// @ts-check
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';

import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import NoMatch from './components/NoMatch.jsx';
import Chat from './components/Chat.jsx';

import useAuth from './hooks/useAuth.jsx';

import getModal from './components/modals/index.jsx';

function PrivateRoute({ children }) {
  const location = useLocation();
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
}

function AuthButton() {
  const { t } = useTranslation();
  const auth = useAuth();

  return auth.loggedIn && <Button onClick={auth.logOut}>{t('btn.logOut')}</Button>;
}

function Modal() {
  const { type } = useSelector((state) => state.modals);
  if (!type) {
    return null;
  }
  const Component = getModal(type);
  return <Component />;
}

function App() {
  const { t } = useTranslation();

  return (
    <>
      <Router>
        <Navbar variant="light" bg="white" expand="lg" className="shadow-sm">
          <div className="container">
            <Navbar.Brand as={Link} to="/">{t('Hexlet Chat')}</Navbar.Brand>
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
      <Modal />
    </>
  );
}

export default App;
