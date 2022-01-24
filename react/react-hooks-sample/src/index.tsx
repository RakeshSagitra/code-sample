// import mymemo from "./memo";
import React from "react";
import ReactDOM from "react-dom";
// tslint:disable-next-line
import "react-toastify/dist/ReactToastify.css";
// tslint:disable-next-line
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as Sentry from "@sentry/browser";
import ReactGA from "react-ga";
import TagManager from "react-gtm-module";

if (process.env.NODE_ENV !== "production" && false) {
  // const whyDidYouRender = require("@welldone-software/why-did-you-render");
  // tslint:disable-next-line
  const whyDidYouRender = require("@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js");

  whyDidYouRender(React, {
    collapseGroups: true,
    include: [/.*/],
    exclude: [
      /^Link/,
      /^Route/,
      /^BrowserRouter/,
      /MenuItem/,
      /DropdownMenu/,
      /Label/,
      /Input/,
      /.*Divider/,
      // /GRMenuItem/,
      /EmotionCssPropInternal/,
      /Table.*/
    ]
  });
}

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV
});

if (process.env.REACT_APP_GA) {
  ReactGA.initialize(process.env.REACT_APP_GA, {
    testMode: process.env.NODE_ENV !== "production"
  });
}

if (process.env.REACT_APP_GTM_ID) {
  TagManager.initialize({ gtmId: process.env.REACT_APP_GTM_ID });
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
