import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { getPDF } from '../client/actions/api';

const SSRPage = ({ message, errorMessage }) => (
  <>
    <h2 align="center">Ombudsman Toolbox</h2>
    {errorMessage == null ? (
      <h4>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
        <br></br>
        <DropdownButton id="dropdown-basic-button" title="Select Category">
          <Dropdown.Item href="#/category-1">category 1</Dropdown.Item>
          <Dropdown.Item href="#/category-2">category 2</Dropdown.Item>
          <Dropdown.Item href="#/category-3">category 3</Dropdown.Item>
        </DropdownButton>
        <br></br>
        Files:
        {message.map((item) => (
          <li key={item.fileName}>
            <Link href={item.imgURL}><a>{item.fileName}</a></Link>
          </li>
        ))}
      </h4>
    ) : (
      <h4>
        SSR Error:
        {errorMessage}
      </h4>
    )}
  </>
);

SSRPage.getInitialProps = async () => getPDF()
  .then((payload) => ({
    message: payload,
  }))
  .catch((error) => ({
    errorMessage: error.message,
  }));

SSRPage.propTypes = {
  message: PropTypes.arrayOf(Object),
  errorMessage: PropTypes.string,
};

SSRPage.defaultProps = {
  message: null,
  errorMessage: null,
};

export default SSRPage;
