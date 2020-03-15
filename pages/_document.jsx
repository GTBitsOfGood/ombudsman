import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <Navbar style = {{fontFamily: 'Ubuntu'}} bg="light" expand="lg">
            <Navbar.Brand>Ombudsman</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto" activeKey="/">
                <Nav.Link href="/" eventKey="/">Home</Nav.Link>
                <Nav.Link href="/help">Help</Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                <div className="input-group">
                  <Form.Control type="text" placeholder="Search" />
                  <Link href="/search?pdfs=0&pdfs=0&pdfs=0&pdfs=0&pdfs=0&pdfs=0" passHref>
                    <Button variant="outline-success">Search</Button>
                  </Link>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Head>
        <body>
          <Main />
          <NextScript />
          <Navbar style = {{fontFamily: 'Ubuntu'}} sticky="bottom" bg="light">
            <Navbar.Text>
              <Nav activeKey="/">
                <Navbar.Brand>Ombudsman Toolbox</Navbar.Brand>
                <Nav.Link href="/" eventKey="/">Home</Nav.Link>
                <Nav.Link href="/help">Help</Nav.Link>
              </Nav>
            </Navbar.Text>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Button variant="outline-dark">ADD DOCUMENTS</Button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
