import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import Router, { withRouter } from 'next/router';
import { DAppProvider, BSC} from '@usedapp/core'
import OpenGraphImg from '../public/static/assets/opengraph.jpg';
import Favicon from '../public/static/assets/logo.png';
import '../public/static/assets/fonts/stylesheet.css';
import '../styles/styles.scss';

const config = {
  readOnlyCHainId: BSC.chainId,
  readOnlyUrls: {
    [BSC.chainId]: 'https://rpc.ankr.com/bsc'
  }
}

class MyApp extends App {
  static async getInitialProps(props) {
    const { Component, ctx } = props;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <DAppProvider config={config}>
          <Head>
            <title>CZODIAC | The First Global Defi Bank</title>
            <meta name="description" content= "Yield from assets backing CZUSD burn CZF with profits building a rising price floor." />
            <meta name="robots" content= "index, follow"></meta>
            <meta property="og:locale" content="en_EN"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
              rel="shortcut icon"
              type="image/png"
              href={Favicon}
            />
              
            <meta property="og:title" content="CZODIAC | The First Global Defi Bank" />
            <meta property="og:site_name" content="CZodiac" />
            <meta property="og:url" content="https://czodiac.com" />
            <meta property="og:description" content="Yield from assets backing CZUSD burn CZF with profits building a rising price floor." />
            <meta property="og:type" content="article" />
            <meta property="og:image" content={"https://czodiac.com"+OpenGraphImg} />
            <meta property="og:image:width" content="1200" /> 
            <meta property="og:image:height" content="630" />

            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content="https://czodiac.com" />
            <meta name="twitter:title" content="CZODIAC | The First Global Defi Bank"/>
            <meta name="twitter:image" content={"https://czodiac.com"+OpenGraphImg} />
            <meta name="twitter:image:width" content="1200"/>
            <meta name="twitter:image:height" content="630"/>
            <meta name="twitter:description" content="Yield from assets backing CZUSD burn CZF with profits building a rising price floor."/>


          </Head>
          <Component {...pageProps} />=
      </DAppProvider>
    );
  }
}

export default withRouter(MyApp);
