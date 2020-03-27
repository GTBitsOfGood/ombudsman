import React, { useContext, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import { useRouter } from 'next/router';
import { updateClicks } from '../client/actions/api';
import { PdfContext } from './context/pdf-context';
import Link from 'next/link';
import PropTypes from 'prop-types';

const SearchPage = ({ clickUpdate }) => {
  const [loading, pdfs, categories] = useContext(PdfContext);
  const [checked, setCheck] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      setCheck(new Array(categories.length).fill(1));

      const searchArr = router.query.term.split(' ');
      let filtered = [];
      router.query.pdfs.map((item, index) => {
        if (item === '1') filtered = filtered.concat(pdfs[categories[index]]);
      });

      let searchFiltered = new Set();

      // Search Based on exact matches
      // searchArr.map(term => {
      //   filtered.map((pdf) => {
      //     if (pdf.metadata.includes(term.toLowerCase())) searchFiltered.add(pdf);
      //   })
      // });

      // Search based on match of first 5 characters
      searchArr.map(term => {
        const subTerm = term.substring(0, 5).toLowerCase();
        filtered.map(pdf => {
          pdf.metadata.map(data => {
            if (data.substring(0, 5).toLowerCase() === subTerm) searchFiltered.add(pdf);
          });
        })
      });

      filtered = Array.from(searchFiltered);
      filtered.sort((a, b) => (a.views < b.views ? 1 : -1));
      setFilteredPdfs(filtered);
    }
  }, [loading, router.query]);

  return (
    <>
      {loading ? (<div>Loading</div>) :
          (
            <div>
              <Row>
                <Col>
                  <Link href={{ pathname: '/' }}><a>Home</a></Link>
                  <a> / Search Results</a>
                </Col>
              </Row>
              <br />
              <br />
              <Col>
                <Dropdown>
                  <Dropdown.Toggle>
                    Filter By
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {categories.map((item, index) => (
                      <div>
                        <Form.Check
                          className="dropdown-item"
                          onClick={() => {
                            const currCheck = checked;
                            currCheck[index] = (checked[index]) ? 0 : 1;
                            setCheck([...currCheck]);
                          }}
                          value={item}
                          label={item}
                          filtertype="normalfilter"
                        />
                      </div>
))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              {filteredPdfs.map((msg) => (
                <Row>
                  <Col md={{ span: 7, offset: 2 }}>
                    <h2>
                      <Link href="/result">{msg.fileName}</Link>
                    </h2>
                    <h3>Effective Date: 3/12/13</h3>
                    <h5>
                      Views:
                      {' '}
                      {msg.views}
                    </h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis est et ornare maximus. Morbi mattis, tellus maximus elementum mollis, magna sapien dictum ante, blandit aliquet neque sapien sit amet nulla. Vestibulum faucibus lorem non nulla lacinia, eu iaculis turpis sollicitudin. Nunc eget elit laoreet, malesuada risus quis, mollis leo. Nam sit amet sollicitudin elit. Integer est neque, scelerisque vel sem at, fringilla placerat ex. Nam cursus tortor sed diam tincidunt interdum.</p>
                  </Col>
                  <Col>
                    <div align="center">
                      <div className="card card-block">
                        insert pdf
                        <br />
                        preview here
                        <br />
                        <br />
                        <br />
                      </div>
                      <br />
                      <a href={msg.url}>
                        <button type="button" className="btn btn-primary">OPEN PDF</button>
                      </a>
                    </div>
                  </Col>
                  <hr />
                </Row>
              ))}
            </div>
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
