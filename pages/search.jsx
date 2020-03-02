import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Link from 'next/link';
import { getPDF, getCategories, updateClicks } from '../client/actions/api';

const searchPage = ({
  pdfProps, name, pdfs, errorMessage, clickUpdate,
}) => (
  <>
    {errorMessage == null
      ? (
        <div>
          <Row>
            <Col>
              <a href="/">Home</a>
              <a> / Search Results</a>
            </Col>
          </Row>
          {/* Keep for demo purposes */}
          Files:
          {Object.keys(pdfProps).map((category) => (
            pdfProps[category].map((msg) => (

              <li key={msg}>
                <Link href={msg.url}>
                  <a
                    id={msg.fileName}
                    onClick={() => clickUpdate({ fileName: msg.fileName, category })}
                  >
                    {msg.fileName}
                  </a>
                </Link>
                &nbsp;
                <a>
                  Views: {msg.views}
                </a>
              </li>
            ))))}
        </div>
      ) : (
        <h4>
          SSR Error:
          {errorMessage}
        </h4>
      )}
  </>
);

searchPage.getInitialProps = async ({ query }) => {
  const pdfJ = await getPDF();
  const categoriesJ = await getCategories();
  const catArray = Object.keys(categoriesJ);
  const pdfMap = [];
  query.pdfs.map((item, index) => {
    if (item === '1') pdfMap.push(pdfJ.pdfMap[catArray[index]]);
  });
  return { pdfProps: pdfMap, pdfs: query.pdfs };
};

searchPage.propTypes = {
  pdfProps: PropTypes.arrayOf(Object),
  name: PropTypes.string,
  pdfs: PropTypes.arrayOf(Object),
  clickUpdate: PropTypes.func,
  errorMessage: PropTypes.string,
};
searchPage.defaultProps = {
  pdfProps: {},
  name: null,
  pdfs: [],
  clickUpdate: (data) => updateClicks(data.category, data.fileName),
  errorMessage: null,
};
export default searchPage;
