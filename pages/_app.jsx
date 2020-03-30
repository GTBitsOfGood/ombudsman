import App from 'next/app';
import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/static/App.css';
import { PdfContextProvider } from './context/pdf-context';
import Footer from "../client/components/Footer/Footer";
import Header from '../client/components/Header/Header';

class MyApp extends App {
  render() {
    const { router, Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Ombudsman</title>
        </Head>
          <div className='main-wrapper'>
              <Header path={router.pathname}/>
              <div className="App">
                  <div className="Content">
                      <PdfContextProvider>
                        <Component {...pageProps} />
                      </PdfContextProvider>
                  </div>
              </div>
              <Footer path={router.pathname}/>
          </div>
      </>
    );
  }
}

export default withRouter(MyApp);