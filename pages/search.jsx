import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Link from 'next/link';
import { getPDF, getCategories, updateClicks } from '../client/actions/api';

const searchPage = ({
  pdfMap, name, checkedCategories, errorMessage, clickUpdate, categories,
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
          {Object.keys(pdfMap).map((category) => (
            pdfMap[category].map((msg) => (

              <li key={msg}>
                <Link href={{ pathname: '/pdf', query: { url: msg.url, category, fileName: msg.fileName } /* TODO: category is currently a number, not a string, from how it's passed in by search */ }}>
                  <a
                    id={msg.fileName}
                    role="link"
                    onClick={() => clickUpdate({ fileName: msg.fileName, category: categories[category] })}
                    onKeyDown={(event) => { if (event.keycode === 13) clickUpdate({ fileName: msg.fileName, category: categories[category] }); }}
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

searchPage.getInitialProps = async ({ pdfMap, categories, checkedCategories }) => {
  const ppdfMap = pdfMap.filter((val, index) => checkedCategories[index] === '1');
  return { pdfMap: ppdfMap, checkedCategories, categories };
};

searchPage.propTypes = {
  pdfMap: PropTypes.arrayOf(Object),
  name: PropTypes.string,
  checkedCategories: PropTypes.arrayOf(Number),
  clickUpdate: PropTypes.func,
  errorMessage: PropTypes.string,
  categories: PropTypes.arrayOf(Object),
};
searchPage.defaultProps = {
  pdfMap: {},
  name: null,
  checkedCategories: [],
  clickUpdate: (data) => updateClicks(data.category, data.fileName),
  errorMessage: null,
  categories: [],
};
export default searchPage;
