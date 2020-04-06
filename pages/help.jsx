import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import Link from 'next/link';
import { getPDF, getCategories, updateClicks } from '../client/actions/api';

const helpPage = ({
  pdfProps, name, errorMessage, clickUpdate, categories,
}) => (
  <>
    {errorMessage == null
      ? (
        <div>
          <Row>
            <Col md={{ span: 5, offset: 3 }}>
              <h2>
                How do I use the Ombudsman Toolbox?
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis est et ornare maximus. Morbi mattis, tellus maximus elementum mollis, magna sapien dictum ante, blandit aliquet neque sapien sit amet nulla. Vestibulum faucibus lorem non nulla lacinia, eu iaculis turpis sollicitudin. Nunc eget elit laoreet, malesuada risus quis, mollis leo. Nam sit amet sollicitudin elit. Integer est neque, scelerisque vel sem at, fringilla placerat ex. Nam cursus tortor sed diam tincidunt interdum.
              </p>
              <h2>
                Keep in Mind...
              </h2>
              <ul>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis est et ornare maximus. Morbi mattis, tellus maximus elementum mollis, magna sapien dictum ante, blandit aliquet neque sapien sit amet nulla.
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      ) : (
        <h4>
          SSR Error:
          {errorMessage}
        </h4>
      )}
  </>
);

helpPage.getInitialProps = async () => {
  const pdfJ = await getPDF();
  const categoriesJ = await getCategories();
  const catArray = Object.keys(categoriesJ);
  const pdfMap = [];
  return { pdfProps: pdfMap, categories: catArray, };
};

helpPage.propTypes = {
  pdfProps: PropTypes.arrayOf(Object),
  name: PropTypes.string,
  pdfs: PropTypes.arrayOf(Object),
  clickUpdate: PropTypes.func,
  errorMessage: PropTypes.string,
};
helpPage.defaultProps = {
  pdfProps: {},
  name: null,
  pdfs: [],
  clickUpdate: (data) => updateClicks(data.category, data.fileName),
  errorMessage: null,
};
export default helpPage;
