import React, { useState, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PdfContext } from './context/pdf-context';
import Loading from '../client/components/Loading/Loading';
import withAuth from '../client/components/Admin/auth';
import AddForm from '../client/components/Form/AddForm';
import pdfObject from '../utils/objects';


const AddPage = () => {
	const [loading, pdfs, categories] = useContext(PdfContext);

	return (
  <>
    {loading ? (<Loading />) : (
      <div>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1 align="center">Add Document</h1>
            <AddForm add categories={categories} pdf={pdfObject} />
          </Col>
        </Row>
      </div>
    )}
  </>);
};

export default withAuth(AddPage);
