import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import urls from '../../../utils/urls';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Footer = ({ path }) => (
  <Navbar sticky="bottom" bg="light" expand="md">
    <Navbar.Brand>Ombudsman</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav activeKey={path}>
        <Nav.Item>
          <Nav.Link href={urls.pages.index}>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/help">Help</Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav className="ml-auto">
        <Link href="/login"><Button variant="outline-dark">ADD DOCUMENTS</Button></Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Footer.propTypes = {
  path: PropTypes.string
};

Footer.defaultProps = {
  path: '/'
};

export default Footer;