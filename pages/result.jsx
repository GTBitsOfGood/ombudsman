import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Link from 'next/link';
import { getPDF, updateClicks } from '../client/actions/api';
import Loading from '../client/components/Loading/Loading';
import { PdfContext } from './context/pdf-context';
import { useRouter } from 'next/router';
import urls from '../utils/urls';

const resultPage = () => {
  const [loading, pdfs, categories, sortedPdfs] = useContext(PdfContext);
  const router = useRouter();

  return (
    <>
      {loading ? (<Loading />) : (
        <>
          <Row>
            <Col>
              <Link href={{ pathname: urls.pages.index }}><a>Home</a></Link>
              <a> / </a>
              <Link href={{ pathname: urls.pages.search, query: { term: router.query.term, selected: router.query.selected } }}><a>Search Results</a></Link>
              <a> / {router.query.fileName}</a>
            </Col>
          </Row>
          <div className="my-5">
            <Row>
              <Col md={{ span: 9, offset: 0 }}>
                <h2>
                  {router.query.fileName}
                </h2>
                <h3>Effective Date: 3/12/13</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis est et ornare maximus. Morbi
                  mattis, tellus maximus elementum mollis, magna sapien dictum ante, blandit aliquet neque sapien sit amet
                  nulla. Vestibulum faucibus lorem non nulla lacinia, eu iaculis turpis sollicitudin. Nunc eget elit
                  laoreet, malesuada risus quis, mollis leo. Nam sit amet sollicitudin elit. Integer est neque,
                  scelerisque vel sem at, fringilla placerat ex. Nam cursus tortor sed diam tincidunt interdum.
                </p>
                <h2>
                  <br />
                  Table of Contents
                </h2>
              </Col>
              <Col md={{ span: 3, offset: 0 }}>
                <div className="card card-block">
                  insert pdf
                  <br />
                  preview here
                  <br />
                  <br />
                  <br />
                </div>
                <br />
                <div align="center">
                  <a href={router.query.fileURL}>
                    <button type="button" className="btn btn-primary">OPEN PDF</button>
                  </a>
                </div>
              </Col>
            </Row>
          </div>
        </>
)}
    </>
);
};

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