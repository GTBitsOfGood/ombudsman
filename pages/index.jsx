import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

import { getPDF, updateClicks, getCategories } from '../client/actions/api';

const SSRPage = ({
  pdfProps, categories, errorMessage, clickUpdate, sortedPdfs,
}) => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    setPdfs(pdfProps);
  }, []);

  return (
    <>
	  <br /><br /><br />
      <h2 align="center">Ombudsman Toolbox Search</h2>
      {errorMessage == null ? (
        <h4>
          <div className="col-lg-7 ml-auto">
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
				<div className="dropdown">
				  <DropdownButton id="dropdown-basic-button" title="Select a Category">
					{categories.map((item) => (
					  <Dropdown.Item href={`#/${item}`} onClick={() => setPdfs({ item: pdfProps[item] })}>{item}</Dropdown.Item>
					))}
				  </DropdownButton>
				</div>
				&nbsp;
              <Button variant="outline-success">Search</Button>
            </Form>
            <br />
            {/* Keep for demo purposes */}
            {/* Files: */}
            {/* {Object.keys(pdfs).map((category) => ( */}
            {/*  pdfs[category].map((msg) => ( */}
            {/*    <li key={msg}> */}
            {/*      <a> */}
            {/*        Views: */}
            {/*        {msg.views} */}
            {/*      </a> */}
            {/*      <Link href={msg.url}> */}
            {/*        <a */}
            {/*          id={msg.fileName} */}
            {/*          onClick={() => clickUpdate({ fileName: msg.fileName, category })} */}
            {/*        > */}
            {/*          {msg.fileName} */}
            {/*        </a> */}
            {/*      </Link> */}
            {/*    </li> */}
            {/*  ))))} */}
          </div>
          <br />
          <br />
          <br />
          <hr />
          <br />
          <div align="center">
            Frequently Viewed Documents
            <br />
            <br />
          </div>
          <Container fluid="true" align="center">
            <Row>
              <Col>
			  <div class="card card-block">
                {sortedPdfs[0].fileName}
                <p>
                  <a
                    href={sortedPdfs[0].url}
                    onClick={() => clickUpdate(
                      { fileName: sortedPdfs[0].fileName, category: sortedPdfs[0].category },
                    )}
                  >
				  <br />
                    <button type="button" className="btn btn-primary">View</button>
                  </a>
                </p>
			  </div>
              </Col>
              <Col>
			  <div class="card card-block">
                {sortedPdfs[1].fileName}
                <p>
                  <a
                    href={sortedPdfs[1].url}
                    onClick={() => clickUpdate(
                      { fileName: sortedPdfs[1].fileName, category: sortedPdfs[1].category },
                    )}
                  >
					<br />
                    <button type="button" className="btn btn-primary">View</button>
                  </a>
                </p>
			  </div>
              </Col>
              <Col>
			  <div class="card card-block">
                {sortedPdfs[2].fileName}
                <p>
                  <a
                    href={sortedPdfs[2].url}
                    onClick={() => clickUpdate(
                      { fileName: sortedPdfs[2].fileName, category: sortedPdfs[2].category },
                    )}
                  >
					<br /><br />
                    <button type="button" className="btn btn-primary">View</button>
                  </a>
                </p>
			  </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
			  <div class="card card-block">
                {sortedPdfs[3].fileName}
                <p>
                  <a
                    href={sortedPdfs[3].url}
                    onClick={() => clickUpdate(
                      { fileName: sortedPdfs[3].fileName, category: sortedPdfs[3].category },
                    )}
                  >
					<br />
                    <button type="button" className="btn btn-primary">View</button>
                  </a>
                </p>
			  </div>
              </Col>
              <Col>
			  <div class="card card-block">
                {sortedPdfs[4].fileName}
                <p>
                  <a
                    href={sortedPdfs[4].url}
                    onClick={() => clickUpdate(
                      { fileName: sortedPdfs[4].fileName, category: sortedPdfs[4].category },
                    )}
                  >
					<br />
                    <button type="button" className="btn btn-primary">View</button>
                  </a>
                </p>
			  </div>
              </Col>
              <Col>
			  <div class="card card-block">
                {sortedPdfs[5].fileName}
                <p>
                  <a
                    href={sortedPdfs[5].url}
                    onClick={() => clickUpdate(
                      { fileName: sortedPdfs[5].fileName, category: sortedPdfs[5].category },
                    )}
                  >
					<br />
                    <button type="button" className="btn btn-primary">View</button>
                  </a>
                </p>
			  </div>
              </Col>
            </Row>
          </Container>
          <br />
          <hr />
          <br />
          <div align="center">
            Find By Category
            <br />
            <br />
            <Container>
              {categories.map((category, i) => {
                if (i * 2 + 1 < categories.length) {
                  return (
                    <Row>
                      <Col md={{ span: 0, offset: 2 }} xs lg="3">
                        <DropdownButton id="dropdown-basic-button" title={categories[i * 2]}>
                          {pdfProps['Assisted Living Communities'].map((pdf) => (
                            <Dropdown.Item href={pdf.url}>{pdf.fileName}</Dropdown.Item>))}
                        </DropdownButton>
                      </Col>
                      <Col md={{ span: 0, offset: 2 }} xs lg="3">
                        <DropdownButton id="dropdown-basic-button" title={categories[i * 2 + 1]}>
                          {pdfProps[categories[i * 2 + 1]].map((pdf) => (
                            <Dropdown.Item href={pdf.url}>{pdf.fileName}</Dropdown.Item>))}
                        </DropdownButton>
                      </Col>
                    </Row>
                  );
                } if (i * 2 < categories.length) {
                  return (
                    <Row>
                      <Col md={{ span: 0, offset: 2 }} xs lg="3">
                        <DropdownButton id="dropdown-basic-button" title={categories[i * 2]}>
                          {pdfProps[categories[i * 2]].map((pdf) => (
                            <Dropdown.Item href={pdf.url}>{pdf.fileName}</Dropdown.Item>))}
                        </DropdownButton>
                      </Col>
                    </Row>
                  );
                }
                return null;
              })}
            </Container>
          </div>
		  <br /><br /><br /><br /><br /><br />
        </h4>
      ) : (
        <h4>
          SSR Error:
          {errorMessage}
        </h4>
      )}
    </>
  );
};

SSRPage.getInitialProps = async () => {
  const pdfJ = await getPDF();
  const categoriesJ = await getCategories();
  return {
    pdfProps: pdfJ.pdfMap,
    categories: Object.keys(categoriesJ),
    errorMessage: null,
    sortedPdfs: pdfJ.sortedPdfs,
  };
};

SSRPage.propTypes = {
  pdfProps: PropTypes.objectOf(Object),
  categories: PropTypes.arrayOf(Object),
  errorMessage: PropTypes.string,
  clickUpdate: PropTypes.func,
  sortedPdfs: PropTypes.arrayOf(Object),
};
SSRPage.defaultProps = {
  pdfProps: [],
  categories: [],
  errorMessage: null,
  clickUpdate: (data) => updateClicks(data.category, data.fileName),
  sortedPdfs: [],
};
export default SSRPage;
