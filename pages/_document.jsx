import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Ombudsman Toolbox</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#browse">Browse</Nav.Link>
                <Nav.Link href="#help">Help</Nav.Link>
              </Nav>
              {/* <Form inline>
				  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
				  <Button variant="outline-success">Search</Button>
				</Form> */}
            </Navbar.Collapse>
          </Navbar>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
