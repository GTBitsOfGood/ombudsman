import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { PdfContext } from './context/pdf-context';
import Loading from '../client/components/Loading/Loading';
import { authenticate } from '../client/actions/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import urls from '../utils/urls';
import withAuth from '../client/components/Admin/auth';

const LoginPage = ({ signIn }) => {
  const [loading] = useContext(PdfContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    let response = await authenticate(email, password);
    router.push(urls.pages.add);
  };

  return (
    <>
      {loading ? (<Loading />) : (
        <>
          <div className="vertical-center absolute-center"><h1>Ombudsman Admin Login</h1></div>
          <Container fluid>
            <Col md={{ span: 4, offset: 4 }} className="mt-2">
              <div className="justify-content-center">
                <Row>
                  <Col md={{ span: 2 }}>
                    <h5>Email</h5>
                  </Col>
                  <Col md={{ span: 9, offset: 1 }}>
                    <Form.Control type="text" placeholder="Email" onChange={(e) => (setEmail(e.target.value))} />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={{ span: 4, offset: 4 }} className="mt-2">
              <div className="justify-content-center">
                <Row>
                  <Col md={{ span: 2 }}>
                    <h5>Password</h5>
                  </Col>
                  <Col md={{ span: 9, offset: 1 }}>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => (setPassword(e.target.value))} />
                  </Col>
                </Row>
              </div>
            </Col>
            <Row className="mt-4">
              <Col>
                <div className="absolute-center">
                  <Button variant="outline-success" onClick={handleLogin}>Login</Button>
                </div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <div className="absolute-center"><Link href="/login">Forgot Password?</Link></div>
              </Col>
            </Row>
          </Container>
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
