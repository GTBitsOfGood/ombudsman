import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getPDF } from '../client/actions/api';

const SSRPage = ({ message, errorMessage }) => (
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
              <Dropdown.Item href="#/category-1">category 1</Dropdown.Item>
              <Dropdown.Item href="#/category-2">category 2</Dropdown.Item>
              <Dropdown.Item href="#/category-3">category 3</Dropdown.Item>
            </DropdownButton>
          </div>
          <br />
            {/*Files:
          {message.map((item) => (
            <li key={item.fileName}>
              <Link href={item.imgURL}><a>{item.fileName}</a></Link>
            </li>
          ))}*/}
        </div>
        <br /><br /><br />
        <hr />
        <br />
        <div align="center">Frequently Viewed Documents<br /><br /></div>
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
            Find By Category<br /><br />
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

SSRPage.getInitialProps = async () => getPDF()
  .then((payload) => ({
    message: payload,
  }))
  .catch((error) => ({
    errorMessage: error.message,
  }));

SSRPage.propTypes = {
  message: PropTypes.arrayOf(Object),
  errorMessage: PropTypes.string,
};

SSRPage.defaultProps = {
  message: null,
  errorMessage: null,
};

export default SSRPage;
