// @ts-check
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';

import routes from '../../../routes.js';
import useAuth from '../../hooks/index.jsx';

import loginImage from '../../assets/login.png';

function LoginPage(props) {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef();
  const { state } = props;

  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const generateOnSubmit = async (values) => {
    setAuthFailed(false);
    try {
      const res = await axios.post(routes.loginPath(), values);
      localStorage.setItem('userId', JSON.stringify(res.data));
      auth.logIn();
      const { from } = location.state || state || { from: { pathname: '/' } };
      navigate(from);
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        setAuthFailed(true);
        inputRef.current.select();
        return;
      }
      throw err;
    }
  };

  console.log(authFailed);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImage} alt="Войти" className="rounded-circle" width={200} height={200} />
              </div>
              <Formik
                onSubmit={generateOnSubmit}
                initialValues={{
                  username: '',
                  password: '',
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Войти</h1>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        type="text"
                        id="username"
                        placeholder="Ваш ник"
                        name="username"
                        ref={inputRef}
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={authFailed}
                        required
                      />
                      <Form.Label htmlFor="username">Ваш ник</Form.Label>
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                      <Form.Control
                        type="password"
                        id="password"
                        placeholder="Пароль"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={authFailed}
                        required
                      />
                      <Form.Label htmlFor="password">Пароль</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>Неверные имя пользователя или пароль</Form.Control.Feedback>
                    </Form.Floating>
                    <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
