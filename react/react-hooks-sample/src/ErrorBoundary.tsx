import React from "react";
import * as Sentry from "@sentry/browser";
import ErrorPage from "./pages/ErrorPage";
import { Redirect } from "react-router-dom";
import { InvalidShortGitProviderError } from "./types/InvalidShortGitProviderError";

interface IState {
  eventId: string | null;
  error: Error | null;
}

class ErrorBoundaryPage extends React.Component<{}, IState> {
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  constructor(props: {}) {
    super(props);
    this.state = { eventId: null, error: null };
  }

  componentDidCatch(error: Error | null, info: object) {
    this.logErrorToMyService(error, info);
  }

  openDialog = () => {
    if (Sentry.lastEventId()) {
      Sentry.showReportDialog();
    }
  };

  logErrorToMyService = (error: Error | null, info: object) => {
    if (
      error !== null &&
      error.name !== "InvalidShortGitProviderError" &&
      error.message !== "404"
    ) {
      Sentry.withScope(scope => {
        scope.setExtras(info);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId });
      });
    }
  };

  render() {
    const { error } = this.state;
    if (error !== null) {
      if (error.name === "InvalidShortGitProviderError") {
        return <Redirect to={(error as InvalidShortGitProviderError).redirectTo} />;
      }
      let errorType: "sentry" | "404" = "sentry";
      if (error.name === "EntityNotFoundError") {
        errorType = "404";
      }
      return <ErrorPage errorType={errorType} openSentryDialog={this.openDialog} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundaryPage;
