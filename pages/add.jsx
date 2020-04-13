import React, { useState, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import { PdfContext } from './context/pdf-context';
import Loading from '../client/components/Loading/Loading';
import withAuth from '../client/components/Admin/auth';
import { uploadDocument } from '../server/actions/database';
import { addInfo } from '../client/actions/api';
import { Formik } from 'formik';
import { addFormSchema } from '../client/components/Validation/validation';

const AddPage = () => {
	const [loading, pdfs, categories] = useContext(PdfContext);
  const [validated, setValidated] = useState(false);

	return (
  <>
    {loading ? (<Loading />) : (
      <div>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1 align="center">Add Document</h1>
            <Formik
              validationSchema={addFormSchema}
              onSubmit={async ({ title, tag, file, category, keywords, description }) => {
                await uploadDocument(category, title, file.file);
                await addInfo(category, title, tag, description, keywords);
                alert('Successfully added the document');
              }}
              initialValues={{ file: null, category: '', title: 'Choose a file...', tag: 'State', description: '', keywords: [] }}
            >
              {({ handleSubmit, handleChange, values, touched, errors, setValues }) =>
                (
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Upload Document</Form.Label>
                        <Form.File
                          id="custom-file"
                          name="file"
                          label={values.title}
                          custom
                          onChange={(event) => {
                          const newValues = { ...values };
                          newValues.file = { file: event.target.files[0] };
                          newValues.title = event.target.files[0].name;
                          setValues(newValues);
                        }}
                          isInvalid={touched.file && errors.file}
                        />
                        <Form.Control.Feedback type="invalid">{errors.file}</Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Category</Form.Label>
                        <Typeahead
                          name="category"
                          labelKey="name"
                          positionFixed
                          onChange={(selected) => {
                            const newValues = { ...values };
                            newValues.category = selected[0] ? (selected[0].name ? (selected[0].name) : selected[0]) : (selected);
                            setValues(newValues);
                          }}
                          options={categories}
                          placeholder="Choose a category..."
                          newSelectionPrefix="Add a new category: "
                          allowNew
                          selectHintOnEnter
                          isInvalid={touched.category && errors.category}
                        />
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>State/Federal</Form.Label>
                        <Form.Control
                          name="tag"
                          as="select"
                          onChange={handleChange}
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
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Keywords</Form.Label>
                        <Typeahead
                          name="keywords"
                          allowNew
                          multiple
                          labelKey="name"
                          onChange={(selected) => {
                          const newValues = { ...values };
                          const keyWordList = selected.map(select => select.name);
                          newValues.keywords = keyWordList;
                          setValues(newValues);
                        }}
                          options={[]}
                          newSelectionPrefix="Add a new keyword: "
                          placeholder="Add custom keywords..."
                          selectHintOnEnter
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          name="description"
                          as="textarea"
                          onChange={handleChange}
                          isInvalid={errors.description}
                        />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <div align="right">
                      <Button variant="light">Cancel</Button>
                      <Button align="right" type="submit" variant="primary">Submit</Button>
                    </div>
                  </Form>
)}
            </Formik>
          </Col>
          {/* <Col md={{ span: 3 }}>
							<div className="card card-block" align="center">insert pdf <br />preview here<br /><br /><br /></div>
							</Col> */}
        </Row>
      </div>
    )}
  </>);
};

export default withAuth(AddPage);
