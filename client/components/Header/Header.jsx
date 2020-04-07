import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import urls from '../../../utils/urls';
import { PdfContext } from '../../../pages/context/pdf-context';
import PropTypes from 'prop-types';

const Header = ({ path }) => {
    const [loading, , categories] = useContext(PdfContext);
    const [query, setQuery] = useState('');

    return (loading ? (<></>) : (
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
                      <Form.Control type="text" placeholder="Search" onChange={(e) => (setQuery(e.target.value))} />
                      <Link href={{ pathname: urls.pages.search, query: { selected: new Array(categories.length).fill(1), term: query } }} passHref>
                        <Button variant="outline-success">Search</Button>
                      </Link>
                    </div>
                  </Nav>
                )}
        </Navbar.Collapse>
      </Navbar>
));
};

Header.propTypes = {
  path: PropTypes.string
};

Header.defaultProps = {
  path: '/'
};

export default Header;
