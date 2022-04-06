// @ts-check
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import loginImage from '../../assets/login.png';

const SignInSchema = Yup.object().shape({
  username: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});

function LoginPage() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [SignInSchema]);

  const generateOnSubmit = (formData) => {
    console.log(formData);
  };

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
                validationSchema={SignInSchema}
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
                  touched,
                  errors,
                }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0" noValidate onSubmit={handleSubmit}>
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
                        isInvalid={touched.username && !!errors.username}
                      />
                      <Form.Label htmlFor="username">Ваш ник</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>{errors.username}</Form.Control.Feedback>
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                      <Form.Control
                        type="password"
                        id="password"
                        placeholder="Пароль"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Label htmlFor="password">Пароль</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
                    </Form.Floating>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.city}
                    </Form.Control.Feedback>
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
