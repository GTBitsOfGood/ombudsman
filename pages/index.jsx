import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
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
