import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Link from 'next/link';
import Loading from '../client/components/Loading/Loading';
import { updateClicks } from '../client/actions/api';
import { PdfContext } from './context/pdf-context';

const HomePage = ({ clickUpdate }) => {
  const [loading, pdfs, categories, sortedPdfs] = useContext(PdfContext);
  const [checked, setCheck] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!loading) setCheck(new Array(categories.length).fill(1));
  }, [loading]);

  return (
    <>
      {loading ?
          (<Loading />) :
          (
            <>
              <div>
                <div className="main-search">
                  <h2 align="center">Ombudsman Toolbox Search</h2>
                  <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                      <div className="input-group">
                        <Form.Control type="text" placeholder="Search" onChange={(e) => (setQuery(e.target.value))} />
                        <Dropdown>
                          <Dropdown.Toggle>
                            Select a Category
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <div onClick={() => {
                      if (checked.every((val) => val === 1))  {
                        setCheck(new Array(categories.length).fill(0));
                      } else {
                        setCheck(new Array(categories.length).fill(1));
                      }
                    }}
                            >
                              <Form.Check
                                className="dropdown-item"
                                defaultValue="Select All"
                                label="Select All"
                                checked={checked.every((val) => val === 1)}
                                filtertype="normalfilter"
                                onChange={() => { /* no-op, change handled by the parent component */ }}
                              />
                            </div>
                            {
                      categories.map((item, index) => (
                        <div onClick={() => {
                          let currCheck = checked;
                          currCheck[index] = (checked[index]) ? 0 : 1;
                          setCheck([...currCheck]);
                        }}
                        >
                          <Form.Check
                            className="dropdown-item"
                            value={item}
                            label={item}
                            checked={checked[index]}
                            filtertype="normalfilter"
                          />
                        </div>
                      ))
                    }
                          </Dropdown.Menu>
                        </Dropdown>
                        <Link href={{ pathname: '/search', query: { selected: checked, term: query } }}>
                          <Button variant="outline-success">Search</Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="freq-viewed" align="center">
                  <h4 align="center" className="my-4">Frequently Viewed Documents</h4>
                  <Row className="mb-3">
                    <Col>
                      <div className="card card-block">
                        {sortedPdfs[0].fileName}
                        <p>
                          <a
                            href={sortedPdfs[0].url}
                            onClick={() => clickUpdate(
                        { fileName: sortedPdfs[0].fileName, category: sortedPdfs[0].category })}
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
                  <Row className="mb-3">
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
                  <hr />
                </div>
                <div className="find-category">
                  <h4 align="center" className="my-4">Find by Category</h4>
                  {categories.map((category, i) => {
                if (i * 2 + 1 < categories.length) {
                  return (
                    <Row>
                      <Col md={{ span: 6, offset: 0 }}>
                        <div align="right">
                          <DropdownButton id="dropdown-basic-button" variant="w" size="lg" title={categories[i * 2]}>
                            {pdfs[categories[i * 2]].map((pdf) => (
                              <Dropdown.Item
                                href={pdf.url}
                                onClick={() => clickUpdate(
                                  { fileName: pdf.fileName, category: categories[i * 2] },
                                )}
                              >
                                {pdf.fileName}
                              </Dropdown.Item>
                            ))}
                          </DropdownButton>
                        </div>
                      </Col>
                      <Col md={{ span: 6, offset: 0 }}>
                        <DropdownButton id="dropdown-basic-button" variant="w" size="lg" title={categories[i * 2 + 1]}>
                          {pdfs[categories[i * 2 + 1]].map((pdf) => (
                            <Dropdown.Item
                              href={pdf.url}
                              onClick={() => clickUpdate(
                                { fileName: pdf.fileName, category: categories[i * 2 + 1] },
                              )}
                            >
                              {pdf.fileName}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </Col>
                    </Row>
                  );
                } if (i * 2 < categories.length) {
                  return (
                    <Row>
                      <Col md={{ span: 6, offset: 0 }}>
                        <div align="right">
                          <DropdownButton id="dropdown-basic-button" size="lg" variant="w" title={categories[i * 2]}>
                            {pdfs[categories[i * 2]].map((pdf) => (
                              <Dropdown.Item
                                href={pdf.url}
                                onClick={() => clickUpdate(
                                  { fileName: pdf.fileName, category: categories[i * 2] },
                                )}
                              >
                                {pdf.fileName}
                              </Dropdown.Item>
                            ))}
                          </DropdownButton>
                        </div>
                      </Col>
                    </Row>
                  );
                }
                return null;
              })}
                </div>
              </div>
            </>

)}
    </>
  );
};


HomePage.propTypes = {
  clickUpdate: PropTypes.func
};

HomePage.defaultProps = {
  clickUpdate: (data) => updateClicks(data.category, data.fileName)
};
export default HomePage;
