import React, {useState, useEffect, useContext} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import Link from 'next/link';
import { PdfContext } from './context/pdf-context';
import Loading from '../client/components/Loading/Loading';

const AddPage = ({}) => {
	const [loading, pdfs, categories] = useContext(PdfContext);
  const [checked, setCheck] = useState([]);
	const [file, setFile] = useState(null);

	useEffect(() => {
    if (!loading) {
			console.log(categories.length);
			setCheck(new Array(categories.length).fill(1));
			console.log(checked);
		}
  }, [loading]);

	return (
		<>
    	{loading ? (<Loading/>) : (
        <div>
					<Row>
						{/* <div class="p-3 mb-2 bg-light text-dark">
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
						</div> */}
						<Col>
							<h1>Add Document</h1>
							<Row>
								<Col className="mt-2" align=""><h5>Upload Document</h5></Col>
							</Row>
							
							<Row>
								<Col className="mt-1" md={{span: 5}}>
									<div className="custom-file">
										<input
											type="file"
											className="custom-file-input"
											onChange={(event) => {
												setFile(event.target.files[0]);
												/*uploadDocument('test', 'test.pdf', event.target.files[0]);*/
											}}/>
										<label className="custom-file-label">
											{file ? file.name : 'Choose file'}
										</label>
									</div>
								</Col>
							</Row>
							
							<Row><Col className="mt-4"><h5>Document Title</h5></Col></Row>
							<Row>
								<Col className="mt-1">
									<Form.Control type="text">
									</Form.Control>
								</Col>
							</Row>
							<Row>
							<Col className="mt-4"><h5>Category</h5></Col>
							<Col className="mt-4"><h5>State/Federal</h5></Col>
							</Row>
							
							<Row>
							<Col className="mt-1">
							<Form.Control as="select" value="Choose...">
								{
										categories.map((item, index) => (
										<option									
											value={item}
											label={item}/>
										))
									}
							</Form.Control>
							</Col>
							<Col className="mt-1">
								<Dropdown>
								<Dropdown.Toggle variant="outline-secondary">State</Dropdown.Toggle>
								<Dropdown.Menu>
									<div>
									<Form.Check
											className="dropdown-item"
											value="State"
											filtertype="normalfilter"
											/>
											</div>
											<div>
										<Form.Check
											className="dropdown-item"
											value="Federal"
											filtertype="normalfilter"
										/>
										</div>
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
							
							{/* <Row><Col className="mt-4"><h5>Add Table of Contents (Optional)</h5></Col></Row>
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
							</Col></Row> */}
							<Row align="right">
								<Col className="mt-5">
										<Button variant="light">Cancel</Button>
										<Button variant="primary">Submit</Button>
								</Col>
							</Row>
							</Col>
							<Col md={{ span: 3 }}>
							<div className="card card-block" align="center">insert pdf <br />preview here<br /><br /><br /></div>
							</Col>
					</Row>
        </div>
      )}
  </>);
};

export default AddPage;
