import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getPDF } from '../client/actions/api';

const SSRPage = ({ message, errorMessage }) => (
  <>
    <h2>Ombudsman Toolbox</h2>
    {errorMessage == null ? (
      <h4>
        Files:
        {message.map((item) =>
            <li key={item.fileName}><Link href={item.imgURL}><a>{item.fileName}</a></Link></li>)
        }
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
  message: PropTypes.array,
  errorMessage: PropTypes.string,
};

SSRPage.defaultProps = {
  message: null,
  errorMessage: null,
};

export default SSRPage;
