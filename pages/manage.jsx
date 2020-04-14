import React, { useContext, useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Loading from '../client/components/Loading/Loading';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import EditModal from '../client/components/Modal/EditModal';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { PdfContext } from './context/pdf-context';
import urls from '../utils/urls';
import pdfObject from '../utils/objects';

const ManagePage = () => {
  const [loading, pdfs, categories, sortedPdfs] = useContext(PdfContext);
  const [checked, setCheck] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState(sortedPdfs);
  const [modalShow, setModalShow] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(pdfObject);

  useEffect(() => {
  if (!loading) setCheck(new Array(categories.length).fill(1));
  }, [loading]);
  
  useEffect(() => {
    let filtered = [];
    checked.map((item, index) => {
      if (item === 1) filtered = filtered.concat(pdfs[categories[index]]);
    });
    setFilteredPdfs(filtered);
  }, [checked]);

  return (<>
    {loading ? (<Loading />) : (
      <div>
        <Row>
          <Col>
            <h1>All Documents
              <Link href={urls.pages.add}>
                <button type="button" className="ml-5 btn btn-primary">+ Add Document</button>
              </Link>
            </h1>
            <div align="right">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary">
                  Filter
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {
                    categories.map((item, index) => (
                      <div onClick={() => {
                        const currCheck = checked;
                        currCheck[index] = (checked[index]) ? 0 : 1;
                        setCheck([...currCheck]);
                      }}
                      >
                        <Form.Check
                          className="dropdown-item"
                          checked={checked[index]}
                          label={item}
                          value={item}
                          filtertype="normalfilter"
                        />
                      </div>
                    ))
                  }
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Document Title</th>
                  <th>Category</th>
                  <th>State/Federal</th>
                  <th>Username</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {filteredPdfs.map((msg) => (
                  <tr>
                    <td>{msg.fileName}</td>
                    <td>{msg.category}</td>
                    <td>{msg.tag}</td>
                    <td>
                      <div align="center">
                        XX/YY/ZZZZ
                      </div>
                    </td>
                    <td>
                      <div align="center">
                        <FaRegEdit onClick={() => {
                        setSelectedPdf(msg);
                        setModalShow(true);
                      }}
                        />
                        <FaRegTrashAlt className="ml-4" />
                      </div>
                    </td>
                  </tr>))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <EditModal show={modalShow} pdf={selectedPdf} categories={categories} onHide={() => setModalShow(false)} />
      </div>
    )}
  </>);
};

export default ManagePage;
