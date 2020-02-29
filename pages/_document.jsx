import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

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
            <Navbar.Brand href="#home">Ombudsman</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
				<Nav.Link href="">Home</Nav.Link>
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
		  <Navbar sticky="bottom" bg="light">
			  <Navbar.Text>
				<Navbar.Brand href="#home">Ombudsman Toolbox</Navbar.Brand>
				<Nav.Link href="">Home</Nav.Link>
				<Nav.Link href="#browse">Browse</Nav.Link>
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
