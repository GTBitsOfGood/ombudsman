import React, { useState, useRef } from 'react';
import { usePdf } from '@mikecousins/react-pdf';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Link from 'next/link';
import { getPDF, getCategories, updateClicks } from '../client/actions/api';

const pdfPage = ({ category, fileName, url, errorMessage }) => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument, pdfPage } = usePdf({
    file: 'test.pdf',
    page,
    canvasRef,
  });

  return (
    <div>
      {errorMessage == null ? (
        <div>
          <Row>
            <Col>
              <a href="/">Home</a>
              <a> / {category}</a>
              <a> / {fileName}</a>

              {!pdfDocument && <span>Loading...</span>}
              <canvas ref={canvasRef} />
              {Boolean(pdfDocument && pdfDocument.numPages) && (
                <nav>
                  <ul className="pager">
                    <li className="previous">
                      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                        Previous
                      </button>
                    </li>
                    <li className="next">
                      <button
                        disabled={page === pdfDocument.numPages}
                        onClick={() => setPage(page + 1)}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </Col>
          </Row>
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
