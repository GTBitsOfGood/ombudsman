import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import Link from 'next/link';
import { getPDF, getCategories, updateClicks } from '../client/actions/api';

const addPage = ({
  pdfProps, name, pdfs, errorMessage, clickUpdate, categories
}) => (
  <>
    {errorMessage == null
      ? (
        <div>
			<Row>
				<div class="p-3 mb-2 bg-light text-dark">
				<Col>
			    <h4>Ombudsman <br />Admin</h4>
				<div className="mt-4">
				<a href="/manage" class="text-dark">Manage Documents</a>
				</div>
				<div className="mt-4">
					<a href="/add" class="text-dark">Add Documents</a>
				</div>
				<div className="mt-4">
					<a href="/edithelp" class="text-dark">Edit Help Page</a>
				</div>
				</Col>
				</div>
                <Col>
                  <h1>
                  Add Document
                  </h1>
					<Row><Col className="mt-2"><h5>Upload Document</h5></Col></Row>
					
					<Row>
					<Col className="mt-1">
						<a href="/add">
						<Button variant="outline-secondary">Choose File</Button>
						</a>
						&emsp;No File Chosen
					</Col>
					</Row>
					
					<Row><Col className="mt-4"><h5>Upload Document</h5></Col></Row>
					<Row><Col className="mt-1"><Form.Control type="text" /></Col></Row>
					
					<Row>
					<Col className="mt-4"><h5>Category</h5></Col>
					<Col className="mt-4"><h5>State/Federal</h5></Col>
					</Row>
					
					<Row>
					<Col className="mt-1"><Form.Control type="text" /></Col>
					<Col className="mt-1">
						<Dropdown>
						<Dropdown.Toggle variant="outline-secondary">State</Dropdown.Toggle>
						<Dropdown.Menu>
							{
							  categories.map((item, index) => (
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
							  ))
							}
						  </Dropdown.Menu>
						</Dropdown>
					</Col>
					</Row>
					
					<Row><Col className="mt-4"><h5>Description</h5></Col></Row>
					<Row><Col className="mt-1">
						<InputGroup>
							<FormControl as="textarea" />
						</InputGroup>
					</Col></Row>
					
					<Row><Col className="mt-4"><h5>Add Table of Contents (Optional)</h5></Col></Row>
					<Row><Col className="mt-1">
						<div className="card card-block">
							<Row>
							<Col md={{ span: 1 }}></Col>
							<Col className="mt-1"><h5>Section Title</h5></Col>
							<Col className="mt-1"><h5>Page Number</h5></Col>
							</Row>
							<Row>
							<Col md={{ span: 1 }}><h1 align="center">X</h1></Col>
							<Col className="mt-2"><Form.Control type="text" /></Col>
							<Col className="mt-2"><Form.Control type="text" /></Col>
							</Row>
							<Row><Col></Col><Col></Col>
							<Col md={{ offset: 4 }} className="mt-2">
								<a href="/add">
									<Button variant="primary">Add Section</Button>
								</a>
							</Col>
							</Row>
						</div>
					</Col></Row>
					<Row className="justify-content-md-left">
						<Col md="auto" className="mt-5">
							<a href="/add">
								<Button variant="light">Cancel</Button>
							</a>
						</Col>
						<Col md="auto" className="mt-5">
							<a href="/add">
								<Button variant="primary">Submit</Button>
							</a>
						</Col>
					</Row>
                  </Col>
				  <Col md={{ span: 3 }}>
					<div className="card card-block" align="center">insert pdf <br />preview here<br /><br /><br /></div>
				  </Col>
			</Row>
        </div>
      ) : (
        <h4>
          SSR Error:
          {errorMessage}
        </h4>
      )}
  </>
);

addPage.getInitialProps = async ({ query }) => {
  const pdfJ = await getPDF();
  const categoriesJ = await getCategories();
  const catArray = Object.keys(categoriesJ);
  const pdfMap = [];
  return { pdfProps: pdfMap, categories: catArray, };
};

addPage.propTypes = {
  pdfProps: PropTypes.arrayOf(Object),
  name: PropTypes.string,
  pdfs: PropTypes.arrayOf(Object),
  clickUpdate: PropTypes.func,
  errorMessage: PropTypes.string,
  categories: PropTypes.arrayOf(Object)
};
addPage.defaultProps = {
  pdfProps: {},
  name: null,
  pdfs: [],
  clickUpdate: (data) => updateClicks(data.category, data.fileName),
  errorMessage: null,
  categories: []
};
export default addPage;
