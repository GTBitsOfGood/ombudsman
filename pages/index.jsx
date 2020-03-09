import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

import { getPDF, updateClicks, getCategories } from '../client/actions/api';
import { getKeyWords } from '../client/actions/keywords';

const SSRPage = ({
  pdfProps, categories, errorMessage, clickUpdate, keyWords
}) => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    setPdfs(pdfProps);
  }, []);

  return (
    <>
      <h2 align="center">Ombudsman Toolbox</h2>
      {errorMessage == null ? (
        <h4>
          <div className="col-lg-7 ml-auto">
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
            <br />
            <div className="dropdown">
              Select Category&#8195;
              <DropdownButton id="dropdown-basic-button" title="Category">
                {Object.keys(categories).map((item) => (
                  <Dropdown.Item href={`#/${item}`} onClick={() => setPdfs({ item: pdfProps[item] })}>{item}</Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
            <br />
            Files:
            {Object.keys(pdfs).map((category) => (
              pdfs[category].map((msg) => (
                <li key={msg}>
                  <a>
                    Views:
                    {msg.views}
                  </a>
                  <Link href={msg.url}>
                    <a
                      id={msg.fileName}
                      onClick={() => clickUpdate({ fileName: msg.fileName, category })}
                    >
                      {msg.fileName}
                    </a>
                  </Link>
                </li>
              ))))}
          </div>
          <br />
          <br />
          <br />
          <hr />
          <br />
          <div align="center">
            Frequently Viewed Documents
            <br />
            <br />
          </div>
          <Container fluid="true" align="center">
            <Row>
              <Col>Title 1</Col>
              <Col>Title 2</Col>
              <Col>Title 3</Col>
            </Row>
            <br />
            <Row>
              <Col>Title 4</Col>
              <Col>Title 5</Col>
              <Col>Title 6</Col>
            </Row>
          </Container>
          <br />
          <hr />
          <br />
          <div align="center">
            Find By Category
            <br />
            <br />
            <Container fluid="true" align="center">
              <Row>
                <Col md={{ span: 0, offset: 2 }} xs lg="3">
                  <DropdownButton id="dropdown-basic-button" title="Category">
                    <Dropdown.Item href="#/category-1">document 1</Dropdown.Item>
                    <Dropdown.Item href="#/category-2">document 2</Dropdown.Item>
                    <Dropdown.Item href="#/category-3">document 3</Dropdown.Item>
                  </DropdownButton>
                </Col>
                <Col md={{ span: 0, offset: 2 }} xs lg="3">
                  <DropdownButton id="dropdown-basic-button" title="Category">
                    <Dropdown.Item href="#/category-1">document 1</Dropdown.Item>
                    <Dropdown.Item href="#/category-2">document 2</Dropdown.Item>
                    <Dropdown.Item href="#/category-3">document 3</Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
            </Container>
          </div>
        </h4>
      ) : (
        <h4>
          SSR Error:
          {errorMessage}
        </h4>
      )}
    </>
  );
};

SSRPage.getInitialProps = async () => {
  const pdfJ = await getPDF();
  const categoriesJ = await getCategories();
  // const documentData = ["doc1" , "doc2" , "doc3"] This will eventually be a dic of all the pdfs and their text. 
  // const keyWordsJ = await getKeyWords(documentData);
  // return { pdfProps: pdfJ, categories: categoriesJ, errorMessage: null, keyWords: keyWordsJ };
  return { pdfProps: pdfJ, categories: categoriesJ, errorMessage: null };
};

SSRPage.propTypes = {
  pdfProps: PropTypes.objectOf(Object),
  categories: PropTypes.objectOf(Object),
  errorMessage: PropTypes.string,
  clickUpdate: PropTypes.func,
  keyWords: PropTypes.objectOf(Object)
};
SSRPage.defaultProps = {
  pdfProps: null,
  categories: null,
  errorMessage: null,
  clickUpdate: (data) => updateClicks(data.category, data.fileName),
  keyWords: null,
};
export default SSRPage;
