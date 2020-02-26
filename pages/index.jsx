import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { getPDF, updateClicks } from '../client/actions/api';


const clickUpdate = (item) => {
  updateClicks(item.categories, item.fileName);
};

const SSRPage = ({
  pdfProps, categories, errorMessage, clickUpdate,
}) => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    setPdfs(pdfProps);
  }, []);

  return (
      <>
        <h2 align="center">Ombudsman Toolbox</h2>
        {errorMessage == null ? (
            <h4>
              <div className="col-lg-7 ml-auto">
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                  <Button variant="outline-success">Search</Button>
                </Form>
                <br/>
                <div className="dropdown">
                  Select Category&#8195;
                  <DropdownButton id="dropdown-basic-button" title="Category">
                    <Dropdown.Item onClick={() => setPdfs()}>category 1</Dropdown.Item>
                    <Dropdown.Item href="#/category-2">category 2</Dropdown.Item>
                    <Dropdown.Item href="#/category-3">category 3</Dropdown.Item>
                  </DropdownButton>
                </div>
                <br/>
                Files:
                {pdfs.map((item, i) => (
                    <li key={item.fileName}>
                      <a>
                        Views:
                        {item.views}
                      </a>
                      <Link href={item.imgURL}><a id={item.filename}
                                                  onClick={() => clickUpdate(item)}>{item.fileName}</a></Link>
                    </li>
                ))}
              </div>
            </h4>
        ) : (
            <h4>
              SSR Error:
              {errorMessage}
            </h4>
        )}
      </>
  )
};

SSRPage.getInitialProps = async () => {
  const pdfJ = await getPDF();
  const categoriesJ = null;
  return { pdfProps: pdfJ, categories: categoriesJ, errorMessage: null };
};

SSRPage.propTypes = {
  pdfProps: PropTypes.arrayOf(Object),
  categories: PropTypes.arrayOf(Object),
  errorMessage: PropTypes.string,
  clickUpdate: PropTypes.func,
};
SSRPage.defaultProps = {
  pdfProps: null,
  categories: null,
  errorMessage: null,
  clickUpdate: (data) => clickUpdate(data),
};
export default SSRPage;
