import React, { useContext, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { updateClicks } from '../client/actions/api';
import { PdfContext } from './context/pdf-context';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Loading from '../client/components/Loading/Loading';
import urls from '../utils/urls';
import * as levenshtein from 'damerau-levenshtein';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

/**
 * Split by punctuation, notably not including apostrophes.
 * @param {string} str 
 */
function splitByPunctuation(str) {
  return str.split(/([ .,–—:();:"?/\-&_“”^*#@!<>])/);
}

const SearchPage = ({ clickUpdate }) => {
  const [loading, pdfs, categories] = useContext(PdfContext);
  const [checked, setCheck] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchArr, setSearchArr] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      let filtered = [];
      if (checked.length === 0 || searchTerm !== router.query.term) {
        setSearchTerm(router.query.term);
        setSearchArr(splitByPunctuation(router.query.term));
        router.query.selected.forEach((item, index) => {
          if (item === '1') filtered = filtered.concat(pdfs[categories[index]]);
        });
        setCheck(router.query.selected.map(item => (parseInt(item))));
      } else {
        checked.forEach((item, index) => {
          if (item === 1) filtered = filtered.concat(pdfs[categories[index]]);
        });
      }

      let searchFiltered = new Set();

      if (searchArr.length !== 0 && searchArr[0] !== '') {
        searchArr.forEach(term => {
          filtered.forEach(pdf => {
            pdf.metadata.concat(splitByPunctuation(pdf.fileName)).forEach(data => {
              if (levenshtein(data.toLowerCase(), term.toLowerCase()).similarity > 0.8)
                searchFiltered.add(pdf);
            });
          });
        });

        filtered = Array.from(searchFiltered);
      }
      filtered.sort((a, b) => b.views - a.views);
      setFilteredPdfs(filtered);
    }
  }, [loading, router.query.selected, checked]);


  return (
    <>
      {loading ? (<Loading />) :
          (
            <>
              <Row>
                <Col>
                  <Link href={{ pathname: urls.pages.index }}><a>Home</a></Link>
                  <a> / {searchTerm ? `Search Results for ${searchTerm}` : 'Showing All Results'}</a>
                </Col>
              </Row>
              <div className="my-4">
                <Row>
                  <Col md={{ span: 3, offset: 0 }}>
                    <h4>Filter By</h4>
                    <div onClick={() => (
                    checked.every((val) => val === 1) ? setCheck(new Array(categories.length).fill(0)) : setCheck(new Array(categories.length).fill(1))
                  )}
                    >
                      <Form.Check
                        className="dropdown-item custom-checkbox"
                        defaultValue="Select All"
                        label="Select All"
                        checked={checked.every((val) => val === 1)}
                        filtertype="normalfilter"
                        onChange={() => { /* no-op, change handled by the parent component */ }}
                      />
                    </div>
                    {categories.map((item, index) => (
                      <div onClick={() => {
                        let currCheck = [...checked];
                        currCheck[index] = (currCheck[index]) ? 0 : 1;
                        setCheck(currCheck);
                      }}
                      >
                        <Form.Check
                          className="dropdown-item custom-checkbox"
                          value={item}
                          label={item}
                          checked={checked[index]}
                          filtertype="normalfilter"
                          onChange={() => { /* no-op, change handled by the parent component */ }}
                        />
                      </div>
                    ))}
                  </Col>
                  <Col md={{ span: 9, offset: 0 }}>
                    {filteredPdfs.length === 0
                    ? <p style={{ fontSize: '1.5rem' }}>No results found.</p>
                    : filteredPdfs.map((msg) => (
                      <Row>
                        <Col md={{ span: 9, offset: 0 }}>
                          <h2>
                            <Link href={{ pathname: urls.pages.result, query: { fileName: msg.fileName, fileURL: msg.url, term: setSearchTerm, selected: checked } }}>
                              {msg.fileName}
                            </Link>
                          </h2>
                          <h3>Effective Date: 3/12/13</h3>
                          <h5>
                            Views: {msg.views}
                          </h5>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis est et ornare maximus. Morbi mattis, tellus maximus elementum mollis, magna sapien dictum ante, blandit aliquet neque sapien sit amet nulla. Vestibulum faucibus lorem non nulla lacinia, eu iaculis turpis sollicitudin. Nunc eget elit laoreet, malesuada risus quis, mollis leo. Nam sit amet sollicitudin elit. Integer est neque, scelerisque vel sem at, fringilla placerat ex. Nam cursus tortor sed diam tincidunt interdum.</p>
                        </Col>
                        <Col md={{ span: 3, offset: 0 }}>
                          <div align="center">
                            <div className="card card-block" style={{ height: '280px' }}>
                              {/* See https://github.com/wojtekmaj/react-pdf/issues/512 or https://github.com/wojtekmaj/react-pdf/issues/236 for tips on how to not hardcode the height */}
                              <Document file={msg.url}>
                                <Page pageNumber={1} scale={0.3} />
                              </Document>
                            </div>
                            <Link href={{ pathname: '/render', query: { url: msg.url } }}>
                              <a onClick={() => clickUpdate({ fileName: msg.fileName, category: msg.category })}>
                                <button type="button" className="btn btn-primary">OPEN PDF</button>
                              </a>
                            </Link>
                            <br /><br />
                          </div>
                        </Col>
                        <hr />
                      </Row>
                    ))}
                  </Col>
                </Row>
              </div>
            </>
        )}
    </>
  );
};

SearchPage.propTypes = {
  clickUpdate: PropTypes.func
};

SearchPage.defaultProps = {
  clickUpdate: (data) => (updateClicks(data.category, data.fileName)),
};

export default SearchPage;
