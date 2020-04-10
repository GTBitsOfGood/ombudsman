import App from 'next/app';
import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/static/App.css';
import '../public/static/components.css';
import { PdfContextProvider } from './context/pdf-context';
import Footer from '../client/components/Footer/Footer';
import Header from '../client/components/Header/Header';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import urls from '../utils/urls';
import { CookiesProvider } from 'react-cookie';

class MyApp extends App {

  render() {
    const { router, Component, pageProps } = this.props;
    let admin = false;
    if (router.pathname === urls.pages.add) admin = true;

    return (
      <>
        <Head>
          <title>Ombudsman</title>
        </Head>
        <div className="main-wrapper">
          <PdfContextProvider>
            <Header path={router.pathname} admin={admin} />
            <CookiesProvider>
              <div className="App">
                <div className="Content">
                  <Component {...pageProps} />
                </div>
              </div>
            </CookiesProvider>
            {admin ? (<></>) : (<Footer path={router.pathname} />)}
          </PdfContextProvider>
        </div>
      </>
    );
  }
}

export default withRouter(MyApp);