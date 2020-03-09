import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Link from 'next/link';
import { getPDF, getCategories, updateClicks } from '../client/actions/api';

// We can also use an iframe with src="http://docs.google.com/gview?url=yourPdfUrl&embedded=true", but this always says "No Preview Available" and doesn't work for files larger than 25 MB
// https://github.com/mozilla/pdf.js/tree/master/examples/webpack
// https://github.com/mozilla/pdf.js/blob/master/examples/webpack/main.js
// https://github.com/mikecousins/react-pdf-js does not support selecting text
// https://stackoverflow.com/a/32518877/5139284
// https://github.com/mozilla/pdf.js/wiki/Frequently-Asked-Questions#can-i-load-a-pdf-from-another-server-cross-domain-request
const pdfPage = ({ category, fileName, url, errorMessage }) => {
  return (
    <div height="100%" style={{ overflow: 'auto', height: '100%' }}>
      {errorMessage == null ? (
        <iframe src={/* `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURI(url)}` */ 'https://mozilla.github.io/pdf.js/web/viewer.html?file=https://www.who.int/docs/default-source/coronaviruse/who-china-joint-mission-on-covid-19-final-report.pdf'} title={fileName} height="100%" width="100%" frameBorder="0" />
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
