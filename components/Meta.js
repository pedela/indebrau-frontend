import { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

class Meta extends Component {
  render() {
    return (
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta charSet="utf-8" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <title>Indebrau</title>
      </Head>
    );
  }
}

export default Meta;
