import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Link from 'next/link';
import { getPDF, getCategories, updateClicks } from '../client/actions/api';

const loginPage = ({
  pdfProps, name, errorMessage, clickUpdate, categories,
}) => (
  <>
	<div className="vertical-center absolute-center"><h1>Ombudsman Admin Login</h1></div>
    {errorMessage == null
      ? (
        <Container fluid>
			<Row className="mt-5">
				<Col md={{ span: 2, offset: 4 }}>
					<div class="d-flex justify-content-center"><p>Email</p></div>
				</Col>
				<Col md={{ span: 2 }}>
					<Form.Control type="text" placeholder="Email" />
				</Col>
				<Col></Col>
			</Row>
			<Row className="mt-2">
				<Col md={{ span: 2, offset: 4 }}>
					<div class="d-flex justify-content-center"><p>Password</p></div>
				</Col>
				<Col md={{ span: 2 }}>
					<Form.Control type="text" placeholder="Password" />
				</Col>
				<Col></Col>
			</Row>
			<Row className="mt-4">
				<Col>
					<div className="absolute-center"><Button variant="outline-success">Login</Button></div>
				</Col>
			</Row>
			<Row className="mt-2">
				<Col>
					<div className="absolute-center"><Link href="/login">Forgot Password?</Link></div>
				</Col>
			</Row>
        </Container>
      ) : (
        <h4>
          SSR Error:
          {errorMessage}
        </h4>
      )}
  </>
);

loginPage.getInitialProps = async () => {
  const pdfJ = await getPDF();
  const categoriesJ = await getCategories();
  const catArray = Object.keys(categoriesJ);
  const pdfMap = [];
  return { pdfProps: pdfMap, categories: catArray, };
};

loginPage.propTypes = {
  pdfProps: PropTypes.arrayOf(Object),
  name: PropTypes.string,
  pdfs: PropTypes.arrayOf(Object),
  clickUpdate: PropTypes.func,
  errorMessage: PropTypes.string,
};
loginPage.defaultProps = {
  pdfProps: {},
  name: null,
  pdfs: [],
  clickUpdate: (data) => updateClicks(data.category, data.fileName),
  errorMessage: null,
};
export default loginPage;
