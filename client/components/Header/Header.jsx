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

    return (loading ? (<></>) : (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>{admin ? 'Ombudsman Toolbox' : 'Ombudsman'}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey={path}>
            <Nav.Item>
              <Link href={admin ? urls.pages.add : urls.pages.index}><Nav.Link href={admin ? urls.pages.add : urls.pages.index}>{admin ? 'Manage Documents' : 'Home'}</Nav.Link></Link>
            </Nav.Item>
            <Nav.Item>
              <Link href={admin ? urls.pages.add : urls.pages.help}><Nav.Link href={admin ? urls.pages.add : urls.pages.help}>{admin ? 'Add Documents' : 'Help'}</Nav.Link></Link>
            </Nav.Item>
          </Nav>
          {path === urls.pages.index || admin ? (<></>) :
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
