import React from 'react';
import Modal from 'react-bootstrap/Modal';
import AddForm from '../Form/AddForm';
import PropTypes from 'prop-types';
import pdfObject from '../../../utils/objects';

const EditModal = ({ show, pdf, onHide, categories }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit {pdf.fileName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddForm categories={categories} pdf={pdf} add={false} onHide={onHide} />
      </Modal.Body>
    </Modal>
  );
};

EditModal.propTypes = {
  show: PropTypes.bool,
  pdf: PropTypes.objectOf(Object),
  onHide: PropTypes.func,
  categories: PropTypes.arrayOf(String)
};

EditModal.defaultProps = {
  show: false,
  pdf: pdfObject,
  categories: [],
  onHide: () => {},
};

export default EditModal;