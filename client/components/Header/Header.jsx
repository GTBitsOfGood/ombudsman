import React from 'react';
import Link from 'next/link';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import urls from '../../../utils/urls';

const Header = ({path}) => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand>Ombudsman</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" activeKey={path}>
          <Nav.Item>
            <Nav.Link href={urls.pages.index}>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/help">Help</Nav.Link>
          </Nav.Item>
        </Nav>
        {path === urls.pages.index ? null :
            (
                <Nav className="ml-auto">
                  <div className="input-group">
                    <Form.Control type="text" placeholder="Search" />
                    <Link href={{ pathname: urls.pages.search, query: { pdfs: [1, 1, 1, 1, 1, 1] } }} passHref>
                      <Button variant="outline-success">Search</Button>
                    </Link>
                  </div>
                </Nav>
            )}
      </Navbar.Collapse>
    </Navbar>
);

export default Header;
