import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import { useAuth } from "./providers/auth/react-auth";
import GRLoader from "./components/common/GRLoader";
import ErrorPage from "./pages/ErrorPage";
import { withTracker } from "./utils/withTracker";
import { GRAccountProvider } from "./providers/react-guardrails-account";
import { GRReposProvider } from "./providers/react-guardrails-repos";
import Layout from "./components/layout/Layout";
import { useGR } from "./providers/react-guardrails";

const HandleRedirects = lazy(() => import("./components/HandleRedirects"));
const HandleSubscriptionRedirect = lazy(() => import("./components/HandleSubscriptionRedirect"));

const Login = lazy(() => import("./pages/Login"));
const Insights = lazy(() => import("./pages/Insights"));
const Repositories = lazy(() => import("./pages/Repositories"));
const Findings = lazy(() => import("./pages/Findings"));
const Scans = lazy(() => import("./pages/Scans"));
const People = lazy(() => import("./pages/People"));
const Settings = lazy(() => import("./pages/Settings"));

const RepositoryDetail = lazy(() => import("./pages/RepositoryDetail"));

const NotFound404 = () => <ErrorPage errorType="404" />;

const Loader = () => <GRLoader showLogo={true} showTitle={true} />;

const Routes = () => {
  const { loading, logout } = useAuth()!;
  const { loading: grLoading } = useGR();

  if (loading) {
    return <Loader />;
  }

  const basePath = "/:gitProvider/:account";

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <PrivateRoute path="/subscription/:plan" component={HandleSubscriptionRedirect} />
        <Route path="/login" component={Login} />
        <PrivateRoute path={basePath}>
          {grLoading ? (
            <Loader />
          ) : (
            <GRAccountProvider>
              <GRReposProvider>
                <Layout basePath={basePath}>
                  <Suspense fallback={<GRLoader />}>
                    <Switch>
                      <Route path={`${basePath}/insights`} component={withTracker(Insights)} />
                      <Route path={`${basePath}/findings`} component={withTracker(Findings)} />
                      <Route path={`${basePath}/scans`} component={withTracker(Scans)} />
                      <Route path={`${basePath}/people`} component={withTracker(People)} />

                      <Route path={`${basePath}/settings/:tab`} component={withTracker(Settings)} />
                      <Route
                        path={`${basePath}/settings`}
                        render={(props: RouteComponentProps<any>) => (
                          <Redirect to={`${props.location.pathname}/general`} />
                        )}
                      />

                      <Route
                        exact
                        path={`${basePath}/:repoId(\\d+)/:tab`}
                        component={withTracker(RepositoryDetail)}
                      />
                      <Route
                        exact
                        path={`${basePath}/:repoId(\\d+)`}
                        render={(props: RouteComponentProps<any>) => (
                          <Redirect to={`${props.location.pathname}/overview`} />
                        )}
                      />
                      <Route exact path={basePath} component={withTracker(Repositories)} />
                      <Route
                        path={basePath}
                        render={(props: RouteComponentProps<any>) => (
                          <Redirect to={`${props.match.url}`} />
                        )}
                      />
                    </Switch>
                  </Suspense>
                </Layout>
              </GRReposProvider>
            </GRAccountProvider>
          )}
        </PrivateRoute>
        <Route
          path="/logout"
          render={() => {
            logout();
            return <Loader />;
          }}
        />
        <PrivateRoute path="" component={HandleRedirects} />
        <Route path="*" component={withTracker(NotFound404)} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
