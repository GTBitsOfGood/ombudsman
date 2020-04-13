import React, { useContext, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Link from 'next/link';
import Loading from '../client/components/Loading/Loading';
import { PdfContext } from './context/pdf-context';
import { useRouter } from 'next/router';
import urls from '../utils/urls';
import { pdfjs, Document, Page } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ResultPage = () => {
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
                <div className="card card-block" style={{ height: '450px' }}>
                  {/* See https://github.com/wojtekmaj/react-pdf/issues/512 or https://github.com/wojtekmaj/react-pdf/issues/236 for tips on how to not hardcode the height */}
                  <Document file={router.query.fileURL}>
                    <Page pageNumber={1} scale={0.5} />
                  </Document>
                </div>
                <br />
                <div align="center">
                  <Link href={{ pathname: '/render', query: { url: router.query.fileURL } }}>
                    <a href={router.query.fileURL}>
                      <button type="button" className="btn btn-primary">OPEN PDF</button>
                    </a>
                  </Link>
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
export default ResultPage;