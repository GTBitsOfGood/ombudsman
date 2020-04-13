import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Loading from '../client/components/Loading/Loading';
import { PdfContext } from './context/pdf-context'

const RenderPage = ({ url }) => {
  const [loading] = useContext(PdfContext);
  const pdfViewerUrl = 'https://mozilla.github.io/pdf.js/web/viewer.html?file=';

  return (
    <>
      {loading ? <Loading /> : (
        <>
          <iframe
            title="PDF render"
            style={{
              width: '99%',
              height: '99%',
              frameborder: 0
            }}
            src={pdfViewerUrl + encodeURI(url)}
          />
        </>
      )}
    </>
  );
};

RenderPage.propTypes = {
  url: PropTypes.string,
};

RenderPage.defaultProps = {
  url: '',
};

export default RenderPage;