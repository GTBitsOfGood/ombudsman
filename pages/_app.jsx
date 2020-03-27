import App from 'next/app';
import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import '../public/static/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PdfContextProvider } from './context/pdf-context';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

class MyApp extends App {
  render() {
    const { router, Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Ombudsman</title>
        </Head>
        <Navbar style={{ fontFamily: 'Ubuntu' }} bg="light" expand="lg">
          <Navbar.Brand>Ombudsman</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" activeKey={router.pathname}>
              <Nav.Item>
                <Nav.Link href="/" eventKey="/">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/help">Help</Nav.Link>
              </Nav.Item>
            </Nav>
            {router.pathname === '/' ? null :
                (
                  <Nav className="ml-auto">
                    <div className="input-group">
                      <Form.Control type="text" placeholder="Search" />
                      <Link href={{ pathname: '/search', query: { pdfs: [1, 1, 1, 1, 1, 1] } }} passHref>
                        <Button variant="outline-success">Search</Button>
                      </Link>
                    </div>
                  </Nav>
                )}
          </Navbar.Collapse>
        </Navbar>
        <div className="App">
          <div className="Content">
            <PdfContextProvider>
              <Component {...pageProps} />
            </PdfContextProvider>
          </div>
        </div>
        <Navbar style={{ fontFamily: 'Ubuntu' }} sticky="bottom" bg="light">
          <Navbar.Text>
            <Nav activeKey={router.pathname}>
              <Navbar.Brand>Ombudsman Toolbox</Navbar.Brand>
              <Nav.Item>
                <Nav.Link href="/" eventKey="/">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/help">Help</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Text>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button variant="outline-dark">ADD DOCUMENTS</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default withRouter(MyApp);
