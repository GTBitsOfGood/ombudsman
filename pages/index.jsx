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
import useWindowDimensions from '../client/hooks/useWindowDimensions';

const HomePage = ({ clickUpdate }) => {
  const [loading, pdfs, categories, sortedPdfs] = useContext(PdfContext);
  const [checked, setCheck] = useState([]);
  const [query, setQuery] = useState('');
  const { height, width } = useWindowDimensions();

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
                  <h1 align="center">Ombudsman Toolbox Search</h1>
                  <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                      <form onSubmit={suppressEvent} className="input-group" role="search">
                        <Form.Control type="text" placeholder="Search" onChange={(e) => (setQuery(e.target.value))} />
                        <Dropdown>
                          <Dropdown.Toggle className="btn-light" style={{ borderColor: '#adb3b8' }}>
                            Categories
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
                                <div key={item} onClick={() => {
                                  let currCheck = [...checked];
                                  currCheck[index] = (checked[index]) ? 0 : 1;
                                  setCheck(currCheck);
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
                          <Button variant="outline-success" type="submit">Search</Button>
                        </Link>
                      </form>
                    </Col>
                  </Row>
                </div>
                <div className="freq-viewed" align="center">
                  <h2 align="center" className="my-4">Frequently Viewed Documents</h2>
                  {width > 600 ?
                    [0, 1].map(row =>
                      <Row className="mb-3" key={row}>
                        {[row * 3 + 0, row * 3 + 1,  row * 3 + 2].map(i =>
                          <Col key={i}>
                            <div className="card card-block">
                              {sortedPdfs[i].fileName}
                              <p>
                                <Link href={{ pathname: '/render', query: { url: sortedPdfs[i].url } }}>
                                  <a
                                    onClick={() => clickUpdate(
                                      { fileName: sortedPdfs[i].fileName, category: sortedPdfs[i].category })}
                                  >
                                    <br />
                                    <button type="button" className="btn btn-primary">View</button>
                                  </a>
                                </Link>
                              </p>
                            </div>
                          </Col>
                        )}
                      </Row>
                    ) :
                    [0, 1, 2, 3, 4, 5].map(i =>
                      <div className="card card-block">
                        {sortedPdfs[i].fileName}
                        <p>
                          <Link href={{ pathname: '/render', query: { url: sortedPdfs[i].url } }}>
                            <a
                              onClick={() => clickUpdate(
                                { fileName: sortedPdfs[i].fileName, category: sortedPdfs[i].category })}
                            >
                              <button type="button" className="btn btn-primary">View</button>
                            </a>
                          </Link>
                        </p>
                      </div>
                    )}
                  <hr />
                </div>
                <div className="find-category">
                  <h2 align="center" className="my-4">Find by Category</h2>
                  {categories.map((category, i) =>
                    width > 900 ?
                      ((i * 2 < categories.length) ?
                        <Row key={category}>
                          <CategoryDropdown categoryName={categories[i * 2]} categoryPdfs={pdfs[categories[i * 2]]} align="right" />
                          {(i * 2 + 1 < categories.length) ?
                            <CategoryDropdown categoryName={categories[i * 2 + 1]} categoryPdfs={pdfs[categories[i * 2 + 1]]} align="left" />
                          : null}
                        </Row>
                      : null)
                    : <CategoryDropdown categoryName={categories[i]} categoryPdfs={pdfs[categories[i]]} />
                  )}
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

function suppressEvent(e) {
  e.preventDefault();
};

function CategoryDropdown({ categoryName, categoryPdfs, clickUpdate, align }) {
  return <Col md={{ span: 6, offset: 0 }}>
    <div align={align}>
      <DropdownButton id="dropdown-basic-button" variant="w" size="lg" title={categoryName}>
        {categoryPdfs.map((pdf) => (
          <Link href={{ pathname: '/render', query: { url: pdf.url } }} key={pdf.fileName}>
            <a
              className="dropdown-item"
              onClick={() => clickUpdate(
                { fileName: pdf.fileName, category: categoryName },
              )}
            >
              {pdf.fileName}
            </a>
          </Link>
        ))}
      </DropdownButton>
    </div>
  </Col>;
}

CategoryDropdown.propTypes = {
  categoryName: PropTypes.string,
  categoryPdfs: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    fileName: PropTypes.string,
    views: PropTypes.number,
    category: PropTypes.string
  })),
  clickUpdate: PropTypes.func,
  align: PropTypes.string
};

CategoryDropdown.defaultProps = {
  categoryName: '',
  categoryPdfs: {},
  clickUpdate: (data) => updateClicks(data.category, data.fileName),
  align: 'left'
};
