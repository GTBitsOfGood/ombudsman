import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Link from 'next/link';
import { getPDF, getCategories, updateClicks } from '../client/actions/api';

// We can also use an iframe with src="http://docs.google.com/gview?url=yourPdfUrl&embedded=true", but this always says "No Preview Available" and doesn't work for files larger than 25 MB
const pdfPage = ({ category, fileName, url, errorMessage }) => {
  return (
    <div height="100%" style={{ overflow: 'auto', height: '100%' }}>
      {errorMessage == null ? (
        <object data={url} type="application/pdf" height="99%" width="100%">
          <embed src={url} type="application/pdf" />
        </object>
      ) : (
        <h4>
          SSR Error: {errorMessage}
        </h4>
      )}
    </div>
  );
};

pdfPage.getInitialProps = async ({ query }) => {
  const { url, category, fileName, errorMessage } = query;
  return { url, category, fileName, errorMessage };
};

pdfPage.propTypes = {
  url: PropTypes.string,
  category: PropTypes.string,
  fileName: PropTypes.string,
  errorMessage: PropTypes.string,
};
pdfPage.defaultProps = {
  url: null,
  category: null,
  fileName: null,
  errorMessage: null,
};

export default pdfPage;
