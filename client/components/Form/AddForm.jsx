import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import { uploadDocument } from '../../../server/actions/database';
import Loading from '../Loading/Loading';
import { addInfo } from '../../actions/api';
import { Formik } from 'formik';
import { addFormSchema } from '../Validation/validation';
import { editFormSchema } from '../Validation/validation';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import pdfObject from '../../../utils/objects';

const AddForm = ({ add, categories, pdf, onHide }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  return(
    <>
      {loading ? (<Loading />) : (success  ? (<Alert variant="success">Successfully updated information!</Alert>) : (
        <Formik
          validationSchema={add ? addFormSchema : editFormSchema}
          onSubmit={async ({ title, tag, file, category, keywords, description }) => {
            setLoading(true);
            if (add) {
              let uploadStatus = await uploadDocument(category, title, file.file);
              let addInfoStatus = await addInfo(category, title, tag, description, keywords);
            } else {
              if (file) {
                let uploadStatus = await uploadDocument(category, title, file.file);
              }
              let addInfoStatus = await addInfo(category, title, tag, description, keywords);
            }
            setSuccess(true);
            setLoading(false);
          }}
          initialValues={{ file: null, category: pdf.category, title: pdf.fileName ? pdf.fileName : 'Choose a file...', tag: pdf.tag, description: pdf.description, keywords: pdf.metadata }}
        >
          {({ handleSubmit, handleChange, values, touched, errors, setValues }) =>
            (
              <Form noValidate onSubmit={handleSubmit}>
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
                      defaultSelected={[pdf.category]}
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
                      defaultValue={pdf.tag}
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
                      options={[]}
                      onChange={(selected) => {
                      const newValues = { ...values };
                      const keyWordList = selected.map(select => select.name ? select.name : select);
                      newValues.keywords = keyWordList;
                      setValues(newValues);
                    }}
                      defaultSelected={pdf.metadata}
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
                      isInvalid={!!errors.description}
                      defaultValue={pdf.description}
                    />
                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <div align="right">
                  <Button variant="light" onClick={onHide}>Cancel</Button>
                  <Button align="right" type="submit" variant="primary">Submit</Button>
                </div>
              </Form>
  )}
        </Formik>))}
    </>
  );
};

AddForm.propTypes = {
  add: PropTypes.bool,
  categories: PropTypes.arrayOf(Object),
  pdf: PropTypes.objectOf(Object),
  onHide: PropTypes.func,
};

AddForm.defaultProps = {
  add: true,
  categories: [],
  pdf: pdfObject,
  onHide: () => {},
};

export default AddForm;