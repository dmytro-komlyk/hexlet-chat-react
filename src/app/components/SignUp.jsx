import axios from 'axios';
import * as yup from 'yup';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';

import routes from '../../routes.js';
import useAuth from '../hooks/useAuth.jsx';

import loginImage from '../assets/login.png';

function SignUp() {
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef();

  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string().trim().required('Oбязательное поле')
        .min(3, () => 'От 3 до 20 символов')
        .max(20, () => 'От 3 до 20 символов'),
      password: yup.string().trim().required('Oбязательное поле')
        .min(6, () => 'Не менее 6 символов'),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password')], () => 'Пароли должны совпадать'),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.signUpPath(), values);
        logIn(res.data);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImage} alt="Войти" className="rounded-circle" width={200} height={200} />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="text"
                    id="username"
                    placeholder="Ваш ник"
                    name="username"
                    ref={inputRef}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={(formik.errors.username || authFailed)
                        && formik.touched.username}
                    required
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                  { (!authFailed || formik.errors.username) && <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback> }
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder="Пароль"
                    name="password"
                    values={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={(formik.errors.password || authFailed)
                        && formik.touched.password}
                    required
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  { (!authFailed || formik.errors.password) && <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback> }
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    placeholder="Подтвердите пароль"
                    name="confirmPassword"
                    values={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={(formik.errors.confirmPassword || authFailed)
                        && formik.touched.password}
                    required
                  />
                  <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword || 'Такой пользователь уже существует'}</Form.Control.Feedback>
                </Form.Floating>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">Зарегистрироваться</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
