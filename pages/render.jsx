import React, { useContext } from 'react';
import { PdfContext } from './context/pdf-context';
import { useRouter } from 'next/router';

const RenderPage = () => {
  const router = useRouter();
  const pdfViewerUrl = 'https://mozilla.github.io/pdf.js/web/viewer.html?file=';
  console.log(router.query.url);

  return (
    <>
      <iframe
        title="PDF render"
        style={{
          width: '99%',
          height: '80vh',
          frameborder: 0
        }}
        display="block"
        src={pdfViewerUrl + encodeURIComponent(router.query.url)}
      />
    </>
  );
};

export default RenderPage;