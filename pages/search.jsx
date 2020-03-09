import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import Link from 'next/link';
import { getPDF, getCategories, updateClicks } from '../client/actions/api';

const searchPage = ({
  pdfProps, name, pdfs, errorMessage, clickUpdate, categories,
}) => (
  <>
    {errorMessage == null
      ? (
        <div>
          <Row>
            <Col>
              <a href="/">Home</a>
              <a> / Search Results</a>
            </Col>
          </Row>
		  <br /><br />
		  <Row>
          <Col>
		  <Dropdown>
			  <Dropdown.Toggle>
				Filter By
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
			</Col>
            <Col md={{ span: 3 }}>
			<h2>
			<Link href="https://firebasestorage.googleapis.com/v0/b/ombudsman-a8077.appspot.com/o/LTCO%20Program%2FOlder%20Americans%20Act%20(Federal%20Law).pdf?alt=media&token=99424932-4bab-4ef2-b1ad-1abfa9dd785a">File Name</Link>
			</h2>
			<h3>Effective Date: 3/12/13</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis est et ornare maximus. Morbi mattis, tellus maximus elementum mollis, magna sapien dictum ante, blandit aliquet neque sapien sit amet nulla. Vestibulum faucibus lorem non nulla lacinia, eu iaculis turpis sollicitudin. Nunc eget elit laoreet, malesuada risus quis, mollis leo. Nam sit amet sollicitudin elit. Integer est neque, scelerisque vel sem at, fringilla placerat ex. Nam cursus tortor sed diam tincidunt interdum.</p>
            </Col>
			<Col md={{ span: 1, offset: 3 }}>
			<div className="card card-block">insert pdf <br />preview here<br /><br /><br /></div><br />
			<button type="button" className="btn btn-primary">OPEN PDF</button>
			</Col>
			</Row>
			<hr />
          {/* Keep for demo purposes
          Files:
          {Object.keys(pdfProps).map((category) => (
            pdfProps[category].map((msg) => (

              <li key={msg}>
                <Link href={msg.url}>
                  <a
                    id={msg.fileName}
                    onClick={() => clickUpdate({ fileName: msg.fileName, category })}
                  >
                    {msg.fileName}
                  </a>
                </Link>
                &nbsp;
                <a>
                  Views: {msg.views}
                </a>
              </li>
            ))))} */}
        </div>
      ) : (
        <h4>
          SSR Error:
          {errorMessage}
        </h4>
      )}
  </>
);

searchPage.getInitialProps = async ({ query }) => {
  const pdfJ = await getPDF();
  const categoriesJ = await getCategories();
  const catArray = Object.keys(categoriesJ);
  const pdfMap = [];
  query.pdfs.map((item, index) => {
    if (item === '1') pdfMap.push(pdfJ.pdfMap[catArray[index]]);
  });
  return { pdfProps: pdfMap, pdfs: query.pdfs, categories: catArray, };
};

searchPage.propTypes = {
  pdfProps: PropTypes.arrayOf(Object),
  name: PropTypes.string,
  pdfs: PropTypes.arrayOf(Object),
  clickUpdate: PropTypes.func,
  errorMessage: PropTypes.string,
};
searchPage.defaultProps = {
  pdfProps: {},
  name: null,
  pdfs: [],
  clickUpdate: (data) => updateClicks(data.category, data.fileName),
  errorMessage: null,
};
export default searchPage;
