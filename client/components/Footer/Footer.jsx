import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import urls from '../../../utils/urls';

const Footer = ({path}) => (
    <Navbar sticky="bottom" bg="light">
        <Navbar.Text>
            <Nav activeKey={path}>
                <Navbar.Brand>Ombudsman Toolbox</Navbar.Brand>
                <Nav.Item>
                    <Nav.Link href={urls.pages.index}>Home</Nav.Link>
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
);

export default Footer;