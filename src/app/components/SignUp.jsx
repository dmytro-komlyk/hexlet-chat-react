import axios from 'axios';
import * as yup from 'yup';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import routes from '../../routes.js';
import useAuth from '../hooks/useAuth.jsx';

import loginImage from '../assets/login.png';

function SignUp() {
  const { t } = useTranslation();
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
      username: yup.string().trim().required(t('form.feedback.invalid.required'))
        .min(3, t('form.feedback.invalid.minMax', { min: '3', max: '20' }))
        .max(20, t('form.feedback.invalid.minMax', { min: '3', max: '20' })),
      password: yup.string().trim().required(t('form.feedback.invalid.required'))
        .min(6, () => t('form.feedback.invalid.min', { min: '6' })),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password')], () => t('form.feedback.invalid.oneOf')),
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
                <h1 className="text-center mb-4">{t('form.signUp.title')}</h1>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="text"
                    id="username"
                    placeholder={t('form.signUp.inputUserName')}
                    name="username"
                    ref={inputRef}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={(formik.errors.username || authFailed)
                        && formik.touched.username}
                    required
                  />
                  <Form.Label htmlFor="username">{t('form.signUp.inputUserName')}</Form.Label>
                  { (!authFailed || formik.errors.username) && <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback> }
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder={t('form.signUp.inputPassword')}
                    name="password"
                    values={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={(formik.errors.password || authFailed)
                        && formik.touched.password}
                    required
                  />
                  <Form.Label htmlFor="password">{t('form.signUp.inputPassword')}</Form.Label>
                  { (!authFailed || formik.errors.password) && <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback> }
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    placeholder={t('form.signUp.inputConfirmPassword')}
                    name="confirmPassword"
                    values={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={(formik.errors.confirmPassword || authFailed)
                        && formik.touched.password}
                    required
                  />
                  <Form.Label htmlFor="confirmPassword">{t('form.signUp.inputConfirmPassword')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword || t('form.feedback.error.exist')}</Form.Control.Feedback>
                </Form.Floating>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('form.signUp.btn')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
