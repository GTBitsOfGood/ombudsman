import App from 'next/app';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
// import Header from '../client/components/Header';
import '../public/static/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PdfContext from '../client/components/PdfContext';
import { getPDF } from '../client/actions/api';

function MyApp({ Component, pageProps }) {
  const [pdfMap, setPdfMap] = useState({});
  const [sortedPdfs, setSortedPdfs] = useState({});

  useEffect(() => {
    (async () => {
      const _pdfMap = localStorage.getItem('pdfMap');
      if (_pdfMap) {
        setPdfMap(_pdfMap);
      } else {
        const pdfJ = await getPDF();
        setPdfMap(pdfJ.pdfMap);
        setSortedPdfs(pdfJ.sortedPdfs);
      }

      const _sortedPdfs = localStorage.getItem('sortedPdfs');
      if (_sortedPdfs) {
        setSortedPdfs(_sortedPdfs);
      }
    })();
  });

  return (
    <>
      <Head>
        <title>Ombudsman</title>
      </Head>
      <div className="App">
        <div className="Content">
          <PdfContext.Provider value={{ pdfMap, sortedPdfs }}>
            <Component {...pageProps} />
          </PdfContext.Provider>
        </div>
      </div>
    </>
  );
}

MyApp.propTypes = {
  
}

export default MyApp;
