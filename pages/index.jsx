import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Link from 'next/link';

import { getPDF, updateClicks, getCategories } from '../client/actions/api';
import PdfContext from '../client/components/PdfContext';

const homePage = ({
  pdfProps, categories, errorMessage, clickUpdate, sortedPdfs,
}) => {
  const [pdfs, setPdfs] = useState({});
  const [checked, setCheck] = useState([]);

  useEffect(() => {
    setPdfs(pdfProps);
    setCheck(new Array(categories.length).fill(0));
  }, []);


  return (
    <>
      <br />
      <br />
      <br />
      <h2 align="center">Ombudsman Toolbox Search</h2>
      {errorMessage == null ? (
        <div>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <div className="input-group">
                <Form.Control type="text" placeholder="Search" />
                <Dropdown>
                  <Dropdown.Toggle>
                    Select a Category
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {
                      categories.map((item, index) => (
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
                          key={item}
                        />
                      ))
                    }
                  </Dropdown.Menu>
                </Dropdown>
                  &nbsp;
                <Link href="/search">
                  <Button variant="outline-success">Search</Button>
                </Link>
              </div>
            </Col>
          </Row>
          <br />

          {/* Keep for demo purposes */}
          {/* Files: */}
          {/* {Object.keys(pdfs).map((category) => ( */}
          {/* pdfs[category].map((msg) => ( */}
          {/*   <li key={msg}> */}
          {/*     <a> */}
          {/*       Views: */}
          {/*       {msg.views} */}
          {/*     </a> */}
          {/*     <Link href={msg.url}> */}
          {/*       <a */}
          {/*         id={msg.fileName} */}
          {/*         onClick={() => clickUpdate({ fileName: msg.fileName, category })} */}
          {/*       > */}
          {/*         {msg.fileName} */}
          {/*       </a> */}
          {/*     </Link> */}
          {/*   </li> */}
          {/* ))))} */}
          <br />
          <br />
          <br />
          <hr />
          <br />
          <h4 align="center">Frequently Viewed Documents</h4>
          <br />
          <Container fluid="true" align="center">
            <Row>
              <Col>
                <div className="card card-block">
                  {sortedPdfs[0].fileName}
                  <p>
                    <a
                      href={sortedPdfs[0].url}
                      onClick={() => clickUpdate(
                        { fileName: sortedPdfs[0].fileName, category: sortedPdfs[0].category },
                      )}
                    >
                      <br />
                      <button type="button" className="btn btn-primary">View</button>
                    </a>
                  </p>
                </div>
              </Col>
              <Col>
                <div className="card card-block">
                  {sortedPdfs[1].fileName}
                  <p>
                    <a
                      href={sortedPdfs[1].url}
                      onClick={() => clickUpdate(
                        { fileName: sortedPdfs[1].fileName, category: sortedPdfs[1].category },
                      )}
                    >
                      <br />
                      <button type="button" className="btn btn-primary">View</button>
                    </a>
                  </p>
                </div>
              </Col>
              <Col>
                <div className="card card-block">
                  {sortedPdfs[2].fileName}
                  <p>
                    <a
                      href={sortedPdfs[2].url}
                      onClick={() => clickUpdate(
                        { fileName: sortedPdfs[2].fileName, category: sortedPdfs[2].category },
                      )}
                    >
                      <br />
                      <button type="button" className="btn btn-primary">View</button>
                    </a>
                  </p>
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <div className="card card-block">
                  {sortedPdfs[3].fileName}
                  <p>
                    <a
                      href={sortedPdfs[3].url}
                      onClick={() => clickUpdate(
                        { fileName: sortedPdfs[3].fileName, category: sortedPdfs[3].category },
                      )}
                    >
                      <br />
                      <button type="button" className="btn btn-primary">View</button>
                    </a>
                  </p>
                </div>
              </Col>
              <Col>
                <div className="card card-block">
                  {sortedPdfs[4].fileName}
                  <p>
                    <a
                      href={sortedPdfs[4].url}
                      onClick={() => clickUpdate(
                        { fileName: sortedPdfs[4].fileName, category: sortedPdfs[4].category },
                      )}
                    >
                      <br />
                      <button type="button" className="btn btn-primary">View</button>
                    </a>
                  </p>
                </div>
              </Col>
              <Col>
                <div className="card card-block">
                  {sortedPdfs[5].fileName}
                  <p>
                    <a
                      href={sortedPdfs[5].url}
                      onClick={() => clickUpdate(
                        { fileName: sortedPdfs[5].fileName, category: sortedPdfs[5].category },
                      )}
                    >
                      <br />
                      <button type="button" className="btn btn-primary">View</button>
                    </a>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
          <br />
          <hr />
          <br />
          <h4 align="center">Find by Category</h4>
          <br />
          <Container>
            {categories.map((category, i) => {
              if (i * 2 + 1 < categories.length) {
                return (
                  <Row key={categories[i * 2 + 1]}>
                    <Col>
                      <div align="right">
                        <DropdownButton id="dropdown-basic-button" size="lg" variant="w" title={categories[i * 2]}>
                          {pdfProps[categories[i * 2]].map((pdf) => (
                            <Dropdown.Item
                              href={pdf.url}
                              onClick={() => clickUpdate(
                                { fileName: pdf.fileName, category: categories[i * 2] },
                              )}
                              key={pdf.url}
                            >{pdf.fileName}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </div>
                    </Col>
                    <Col>
                      <DropdownButton id="dropdown-basic-button" size="lg" variant="w" title={categories[i * 2 + 1]}>
                        {pdfProps[categories[i * 2 + 1]].map((pdf) => (
                          <Dropdown.Item
                            href={pdf.url}
                            onClick={() => clickUpdate(
                              { fileName: pdf.fileName, category: categories[i * 2 + 1] },
                            )}
                            key={pdf.url}
                          >{pdf.fileName}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </Col>
                  </Row>
                );
              } if (i * 2 < categories.length) {
                return (
                  <Row key={categories[i * 2]}>
                    <Col>
                      <DropdownButton id="dropdown-basic-button" title={categories[i * 2]}>
                        {pdfProps[categories[i * 2]].map((pdf) => (
                          <Dropdown.Item
                            href={pdf.url}
                            onClick={() => clickUpdate(
                              { fileName: pdf.fileName, category: categories[i * 2] },
                            )}
                            key={pdf.url}
                          >{pdf.fileName}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </Col>
                  </Row>
                );
              }
              return null;
            })}
          </Container>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      ) : (
        <h4>
          SSR Error:
          {errorMessage}
        </h4>
      )}
    </>
  );
};

homePage.getInitialProps = async () => {
  const pdfJ = await getPDF();
  const categoriesJ = await getCategories();
  return {
    pdfProps: pdfJ.pdfMap,
    categories: Object.keys(categoriesJ),
    errorMessage: null,
    sortedPdfs: pdfJ.sortedPdfs,
  };
};

homePage.propTypes = {
  pdfProps: PropTypes.objectOf(Object),
  categories: PropTypes.arrayOf(String),
  errorMessage: PropTypes.string,
  clickUpdate: PropTypes.func,
  sortedPdfs: PropTypes.arrayOf(Object),
};
homePage.defaultProps = {
  pdfProps: {},
  categories: [],
  errorMessage: null,
  clickUpdate: (data) => updateClicks(data.category, data.fileName),
  sortedPdfs: [],
};
export default homePage;
