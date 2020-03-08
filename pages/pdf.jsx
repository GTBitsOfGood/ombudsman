import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Document, Page } from 'react-pdf'

import Link from 'next/link';
import { getPDF, getCategories, updateClicks } from '../client/actions/api';

const pdfPage = ({category, fileName, url, errorMessage}) => {
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = (document) => setNumPages(document.numPages);

  return (
    <div>
      {errorMessage == null
        ? (
          <div>
            <Row>
              <Col>
                <a href="/">Home</a>
                <a> / {category}</a>
                <a> / {fileName}</a>
              </Col>
            </Row>
            <Document file={'https://firebasestorage.googleapis.com/v0/b/ombudsman-a8077.appspot.com/o/Assisted Living Communities%2FFrequently Asked Questions.pdf'} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={1} />
            </Document>
          </div>
        ) : (
          <h4>
            SSR Error:
            {errorMessage}
          </h4>
        )}
    </div>
  );
};

pdfPage.getInitialProps = async ({ query }) => {
  const { url, category, fileName } = query;
  return { url, category, fileName };
};

pdfPage.propTypes = {
  url: PropTypes.string,
  category: PropTypes.string,
  fileName: PropTypes.string,
};
pdfPage.defaultProps = {
  url: null,
  category: null,
  fileName: null,
};

export default pdfPage;
