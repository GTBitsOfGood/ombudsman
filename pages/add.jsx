import React, { useState, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import { PdfContext } from './context/pdf-context';
import Loading from '../client/components/Loading/Loading';
import withAuth from '../client/components/Admin/auth';
import { uploadDocument } from '../server/actions/database';
// import { addInfo } from '../client/actions/api';
import { addInfo } from '../server/actions/database';


const AddPage = () => {
	const [loading, pdfs, categories] = useContext(PdfContext);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState([]);
  const [tag, setTag] = useState("State");
  const [keyWords, setKeyWords] = useState([]);
  const [desc, setDesc] = useState("");

	return (
  <>
    {loading ? (<Loading />) : (
      <div>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1 align="center">Add Document</h1>

            <Row>
              <Col className="mt-2" align=""><h5>Upload Document</h5></Col>
            </Row>

            <Row>
              <Col className="mt-1">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    onChange={(event) => {
                        setFile(event.target.files[0]);
                        setTitle(event.target.files[0].name);
												//uploadDocument('test', 'test.pdf', event.target.files[0]);
											}}
                  />
                  <label className="custom-file-label">
                    {file ? file.name : 'Choose file'}
                  </label>
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="mt-4"><h5>Category</h5></Col>
              <Col className="mt-4"><h5>State/Federal</h5></Col>
            </Row>
		
            <Row>
              <Col className="mt-1">
                <Form>
                  <Typeahead
                    labelKey="name"
                    positionFixed
									  onChange={(selected) => {
                      setCategory( selected[0] );
                      console.log({ selected });
                    }}
                    options={categories}
                    placeholder="Choose a category..."
                    newSelectionPrefix="Add a new category: "
                    allowNew
                  />
                </Form>
              </Col>
              <Col className="mt-1">
                <Form.Control
                as="select"
                onChange={(event) => {
                  setTag(event.target.value);
                }}
                >
                  <option
                    value="State"
                    label="State"
                  />
                  <option
                    value="Federal"
                    label="Federal"
                  />
                </Form.Control>
              </Col>
            </Row>

            <Row>
              <Col className="mt-4"><h5>Keywords</h5></Col>
            </Row>

            <Row>
              <Col className="mt-1">
                <Typeahead
                  allowNew
                  multiple
                  labelKey="name"
                  onChange={(selected) => {
                    const keyWordList = selected.map(select => select.name)
                    setKeyWords(keyWordList);
                  }}
                  options={[]}
                  newSelectionPrefix="Add a new keyword: "
                  placeholder="Add custom keywords..."
                />
              </Col>
            </Row>
							
            <Row>
              <Col className="mt-4"><h5>Description</h5></Col>
            </Row>
							
            <Row>
              <Col className="mt-1">
                <InputGroup>
                  <FormControl
                  as="textarea"
                  onChange={(event) => {
                    setDesc(event.target.value);
                  }}/>
                </InputGroup>
              </Col>
            </Row>
							
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
                <Button
                 variant="primary"
                 onClick={(event) => {
                   uploadDocument(category, title, file);
                   addInfo(category, title, tag, desc, keyWords);
								}}
                >Submit</Button>
              </Col>
            </Row>
          </Col>
          {/* <Col md={{ span: 3 }}>
							<div className="card card-block" align="center">insert pdf <br />preview here<br /><br /><br /></div>
							</Col> */}
        </Row>
      </div>
      )}
  </>
);
};

export default withAuth(AddPage);
