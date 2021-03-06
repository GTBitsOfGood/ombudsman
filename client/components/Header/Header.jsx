import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import urls from '../../../utils/urls';
import { PdfContext } from '../../../pages/context/pdf-context';
import PropTypes from 'prop-types';

const Header = ({ path, admin }) => {
  const [loading, , categories] = useContext(PdfContext);
  const [query, setQuery] = useState('');

  return (
    <Navbar bg="light" expand="md">
      <Link href={urls.pages.index}>
        <Navbar.Brand style={{ cursor: 'pointer' }}>{admin ? 'Ombudsman Toolbox' : 'Ombudsman'}</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" activeKey={path}>
          <Nav.Item>
            <Link href={admin ? urls.pages.manage : urls.pages.index}>
              <Nav.Link href={admin ? urls.pages.manage : urls.pages.index}>
                {admin ? 'Manage Documents' : 'Home'}
              </Nav.Link>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href={admin ? urls.pages.add : urls.pages.help}>
              <Nav.Link href={admin ? urls.pages.add : urls.pages.help}>
                {admin ? 'Add Documents' : 'Help'}
              </Nav.Link>
            </Link>
          </Nav.Item>
        </Nav>
        {loading || path === urls.pages.index || path === urls.pages.add || admin ? null : (
          <Nav className="ml-auto">
            <form className="input-group" onFormSubmit={suppressEvent} role="search">
              <Form.Control type="text" placeholder="Search" onChange={(e) => (setQuery(e.target.value))} />
              <Link href={{ pathname: urls.pages.search, query: { selected: new Array(categories.length).fill(1), term: query } }}>
                <Button variant="outline-success" type="submit">Search</Button>
              </Link>
            </form>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

function suppressEvent(e) {
  e.preventDefault();
}

Header.propTypes = {
  path: PropTypes.string,
  admin: PropTypes.bool,
};

Header.defaultProps = {
  path: '/',
  admin: false,
};

export default Header;
