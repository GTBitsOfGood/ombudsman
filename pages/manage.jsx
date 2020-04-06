import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import Link from 'next/link';
import { getPDF, getCategories, updateClicks } from '../client/actions/api';

const managePage = ({
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
                  All Documents&emsp;
				  <a href="/add">
                    <button type="button" className="btn btn-primary">+ Add Document</button>
                  </a>
                  </h1>
				  <Dropdown>
					<Dropdown.Toggle variant="outline-secondary">
						Filter
					</Dropdown.Toggle>
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
					&emsp;&emsp;
					<Dropdown>
					<Dropdown.Toggle variant="outline-secondary">
						Category
					</Dropdown.Toggle>
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
					<hr />
					<Row>
					<Col><Form.Check type="checkbox" /></Col>
					<Col><b>Document Title</b></Col>
					<Col><b>State/Federal</b></Col>
					<Col><b>Status</b></Col>
					<Col><b>Last Updated</b></Col>
					<Col><b>Operations</b></Col>
					</Row>
					<hr />
					<Row>
					<Col><Form.Check type="checkbox" /></Col>
					<Col>Document Name</Col>
					<Col>State</Col>
					<Col>Published</Col>
					<Col>XX/YY/ZZZZ</Col>
					<Col>edit<br />delete</Col>
					</Row>
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

managePage.getInitialProps = async ({ query }) => {
  const pdfJ = await getPDF();
  const categoriesJ = await getCategories();
  const catArray = Object.keys(categoriesJ);
  const pdfMap = [];
  return { pdfProps: pdfMap, categories: catArray, };
};

managePage.propTypes = {
  pdfProps: PropTypes.arrayOf(Object),
  name: PropTypes.string,
  pdfs: PropTypes.arrayOf(Object),
  clickUpdate: PropTypes.func,
  errorMessage: PropTypes.string,
  categories: PropTypes.arrayOf(Object)
};
managePage.defaultProps = {
  pdfProps: {},
  name: null,
  pdfs: [],
  clickUpdate: (data) => updateClicks(data.category, data.fileName),
  errorMessage: null,
  categories: []
};
export default managePage;
