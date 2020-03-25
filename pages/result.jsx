import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import Link from 'next/link';
import { getPDF, updateClicks } from '../client/actions/api';

const resultPage = () => (
  <>
      <div>
        <Row>
          <Col>
            <a href="/">Home</a>
            <a href="/search?pdfs=0&pdfs=0&pdfs=0&pdfs=0&pdfs=0&pdfs=0"> / Search Results</a>
            <a> / Document Title</a>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col>
            <h2>
              File Name
            </h2>
            <h3>Effective Date: 3/12/13</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis est et ornare maximus. Morbi mattis, tellus maximus elementum mollis, magna sapien dictum ante, blandit aliquet neque sapien sit amet nulla. Vestibulum faucibus lorem non nulla lacinia, eu iaculis turpis sollicitudin. Nunc eget elit laoreet, malesuada risus quis, mollis leo. Nam sit amet sollicitudin elit. Integer est neque, scelerisque vel sem at, fringilla placerat ex. Nam cursus tortor sed diam tincidunt interdum.</p>
            <h2>
              <br />
              Table of Contents
            </h2>
          </Col>
          <Col md={{ span: 1, offset: 2 }}>
            <div className="card card-block">
              insert pdf
              <br />
              preview here
              <br />
              <br />
              <br />
            </div>
            <br />
            <Link href="https://firebasestorage.googleapis.com/v0/b/ombudsman-a8077.appspot.com/o/LTCO%20Program%2FOlder%20Americans%20Act%20(Federal%20Law).pdf?alt=media&token=99424932-4bab-4ef2-b1ad-1abfa9dd785a" passHref>
              <button type="button" className="btn btn-primary">OPEN PDF</button>
            </Link>
          </Col>
        </Row>
      </div>
  </>
);

// resultPage.getInitialProps = async () => {
//   const pdfJ = await getPDF();
//   const categoriesJ = await getCategories();
//   const catArray = Object.keys(categoriesJ);
//   const pdfMap = [];
//   return { pdfProps: pdfMap, categories: catArray };
// };
//
// resultPage.propTypes = {
//   pdfProps: PropTypes.arrayOf(Object),
//   name: PropTypes.string,
//   pdfs: PropTypes.arrayOf(Object),
//   clickUpdate: PropTypes.func,
//   errorMessage: PropTypes.string,
// };
// resultPage.defaultProps = {
//   pdfProps: {},
//   name: null,
//   pdfs: [],
//   clickUpdate: (data) => updateClicks(data.category, data.fileName),
//   errorMessage: null,
// };
export default resultPage;
