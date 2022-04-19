import axios from 'axios';
import * as yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Card, Form, Button, Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import routes from '../../routes.js';
import useAuth from '../hooks/useAuth.jsx';

import loginImage from '../assets/login.png';

function LoginPage() {
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
    },
    validationSchema: yup.object({
      username: yup.string().trim().required(t('form.feedback.invalid.required')),
      password: yup.string().trim().required(t('form.feedback.invalid.required')),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        logIn(res.data);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
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
                <Image src={loginImage} alt={t('img.login')} className="rounded-circle" width={200} height={200} />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('form.login.title')}</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="text"
                    id="username"
                    placeholder={t('form.login.inputUserName')}
                    name="username"
                    ref={inputRef}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={(formik.errors.username || authFailed)
                      && formik.touched.username}
                    required
                  />
                  <Form.Label htmlFor="username">{t('form.login.inputUserName')}</Form.Label>
                  { (!authFailed || formik.errors.username) && <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback> }
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder={t('form.login.inputPassword')}
                    name="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={(formik.errors.password || authFailed)
                      && formik.touched.password}
                    required
                  />
                  <Form.Label htmlFor="password">{t('form.login.inputPassword')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password || t('form.login.feedback.error.wrongValues')}</Form.Control.Feedback>
                </Form.Floating>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('form.login.btn')}</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('form.noAccount')}</span>
                <Link to="/signup">{t('form.signUp.title')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
