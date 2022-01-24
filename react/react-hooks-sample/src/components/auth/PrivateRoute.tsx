import React, { useEffect } from "react";
import { Route, RouteComponentProps, RouteProps, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/auth/react-auth";

interface IProps {
  path: string;
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const PrivateRoute = ({ path, component: Component, ...rest }: RouteProps & IProps) => {
  const { isAuthenticated, redirectToInternalLogin } = useAuth()!;
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }
    const redirectTo =
      pathname && (pathname !== "/" || search) && !pathname.includes("login")
        ? `${pathname}${search}`
        : "";
    redirectToInternalLogin(redirectTo);
  }, [redirectToInternalLogin, isAuthenticated, pathname, search]);

  if (!isAuthenticated) {
    return <Route path={path} render={() => null} />;
  } else if (Component) {
    return <Route path={path} component={Component} {...rest} />;
  }

  return <Route path={path} {...rest} />;
};

export default PrivateRoute;
