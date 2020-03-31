import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import Link from 'next/link';
import { getPDF, getCategories, updateClicks } from '../client/actions/api';

const loginPage = ({
  pdfProps, name, errorMessage, clickUpdate, categories,
}) => (
  <>
    {errorMessage == null
      ? (
        <div align="center">
          <h1>
			Ombudsman Admin Login
		  </h1>
        </div>
      ) : (
        <h4>
          SSR Error:
          {errorMessage}
        </h4>
      )}
  </>
);

loginPage.getInitialProps = async () => {
  const pdfJ = await getPDF();
  const categoriesJ = await getCategories();
  const catArray = Object.keys(categoriesJ);
  const pdfMap = [];
  return { pdfProps: pdfMap, categories: catArray, };
};

loginPage.propTypes = {
  pdfProps: PropTypes.arrayOf(Object),
  name: PropTypes.string,
  pdfs: PropTypes.arrayOf(Object),
  clickUpdate: PropTypes.func,
  errorMessage: PropTypes.string,
};
loginPage.defaultProps = {
  pdfProps: {},
  name: null,
  pdfs: [],
  clickUpdate: (data) => updateClicks(data.category, data.fileName),
  errorMessage: null,
};
export default loginPage;
