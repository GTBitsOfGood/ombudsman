import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { PdfContext } from './context/pdf-context';
import Loading from '../client/components/Loading/Loading';
import { authenticate } from '../client/actions/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import urls from '../utils/urls';
import withAuth from '../client/components/Admin/auth';
import { useCookies } from 'react-cookie';
import { Formik } from 'formik';
import { loginSchema } from '../client/components/Validation/validation';

const LoginPage = ({ signIn }) => {
  const [loading] = useContext(PdfContext);
  const [cookies, setCookie] = useCookies(['admin']);
  const router = useRouter();

  return (
    <>
      {loading ? (<Loading />) : (
        <>
          <div className="vertical-center absolute-center mt-3"><h3>Ombudsman Admin Login</h3></div>
          <Formik
            validationSchema={loginSchema}
            onSubmit={async ({ email, password }, { setStatus }) => {
                let response = await signIn(email, password);
                if (response === 'Login successful') {
                  setCookie('admin', 'true', { 'path': '/' });
                  router.push(urls.pages.add);
                } else setStatus({ status: response });
              }}
            initialValues={{ email: '', password: '' }}
          >
            {({ handleSubmit, handleChange, status, touched, errors, }) =>
                (
                  <Form noValidate onSubmit={handleSubmit}>
                    {console.log(status)}
                    <Form.Group as={Row}>
                      <Form.Label column md={{ span: 1, offset: 4 }}>
                        Email
                      </Form.Label>
                      <Col md={{ span: 3, offset: 0 }}>
                        <Form.Control name="email" type="text" placeholder="Email" onChange={handleChange} isInvalid={status || (errors.email && touched.email)} />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column md={{ span: 1, offset: 4 }}>
                        Password
                      </Form.Label>
                      <Col md={{ span: 3, offset: 0 }}>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange} isInvalid={status || (errors.password && touched.password)} />
                        <Form.Control.Feedback type="invalid">{status ? status.status : errors.password}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <div align="center">
                      <Button variant="outline-success" type="submit">Login</Button>
                      <div className="absolute-center"><Link href="/login">Forgot Password?</Link></div>
                    </div>
                  </Form>
)}
          </Formik>
        </>
)}
    </>
);
};

LoginPage.propTypes = {
	signIn: PropTypes.func
};
  
LoginPage.defaultProps = {
	signIn: (email, password) => (authenticate(email, password)),
};

export default withAuth(LoginPage);
