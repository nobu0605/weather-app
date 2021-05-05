import React from "react";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Header from "../components/Header";

function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <Header>
      <Component {...pageProps} />
    </Header>
  );
}

export default MyApp;
