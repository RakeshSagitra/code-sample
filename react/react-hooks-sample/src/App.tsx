import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { AuthProvider } from "./providers/auth/react-auth";
import { GRProvider } from "./providers/react-guardrails";
import Routes from "./Routes";
import ErrorBoundaryPage from "./ErrorBoundary";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Maitenance from "./pages/Maintenance";
import InitToast from "./components/InitToast";

const App = () => {
  if (process.env.REACT_APP_MAINTENANCE === "true") {
    return (
      <Suspense fallback="loading">
        <Maitenance />
      </Suspense>
    );
  }
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | code-sample.io" />
      <BrowserRouter>
        <InitToast />
        <ErrorBoundaryPage>
          <AuthProvider>
            <GRProvider>
              <Routes />
            </GRProvider>
          </AuthProvider>
        </ErrorBoundaryPage>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
