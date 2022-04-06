// @ts-check
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import LoginPage from './components/pages/LoginPage.jsx';
import NoMatchPage from './components/pages/NoMatchPage.jsx';

function App() {
  return (
    <Router>
      <Navbar variant="light" bg="white" expand="lg" className="shadow-sm">
        <div className="container">
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        </div>
      </Navbar>
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
