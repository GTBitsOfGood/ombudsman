import App from 'next/app';
import React from 'react';
import Head from 'next/head';
import Header from '../client/components/Header';
import '../public/static/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Ombudsman</title>
        </Head>
        <div className="App">
          <div className="Content">
            <Component {...pageProps} />
          </div>
        </div>
      </>
    );
  }
}

export default MyApp;
