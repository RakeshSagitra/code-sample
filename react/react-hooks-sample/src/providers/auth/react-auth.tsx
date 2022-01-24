import React, { useState, useEffect, useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { History } from "history";
import AuthService, { createAuthService } from "../../services/AuthService";
import { GitProvider } from "../../types";
import { ICacheEntry, IUser } from "../../utils/Cache";

interface IAuthStateBase {
  isAuthenticated: boolean;
  user: IUser | undefined;
  loading: boolean;
}

interface IAuthState extends IAuthStateBase {
  authService?: AuthService;
}

interface IAuthContext extends IAuthStateBase {
  redirectToInternalLogin(redirectTo: string): void;
  loginWithRedirect(gitProvider: GitProvider, appState: any): void;
  getIdentity(): ICacheEntry;
  logout(): Promise<void>;
}
interface IAuthProviderOptions {
  children: React.ReactElement;
}

const initialValue: IAuthState = {
  loading: true,
  isAuthenticated: false,
  user: undefined,
  authService: undefined
};

const GR_REDIRECT_CALLBACK = (history: History, appState: any) => {
  history.replace(
    appState && appState.redirectUri ? appState.redirectUri : window.location.pathname
  );
};

export const AuthContext = React.createContext<IAuthContext | null>(null);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: IAuthProviderOptions) => {
  const [contextValue, setContextValue] = useState<IAuthState>(initialValue);
  const [, setState] = useState();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const authService = await createAuthService();
        if (window.location.search.includes("grauth=")) {
          const { appState } = await authService.handleRedirectCallback();
          GR_REDIRECT_CALLBACK(history, appState);
        }
        const isAuthenticated = authService.isAuthenticated();
        const user = isAuthenticated ? authService.getUser() : undefined;

        setContextValue({
          loading: false,
          isAuthenticated,
          user,
          authService
        });
      } catch (e) {
        console.log(e);
        setState(() => {
          throw e;
        });
      }
    })();
    // eslint-disable-next-line
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: contextValue.isAuthenticated,
      user: contextValue.user,
      loading: contextValue.loading,
      redirectToInternalLogin: (redirectTo: string) =>
        contextValue.authService!.redirectToInternalLogin(redirectTo),
      loginWithRedirect: (gitProvider: GitProvider, appState: any) =>
        contextValue.authService!.loginWithRedirect(gitProvider, appState),
      getIdentity: () => contextValue.authService!.getIdentity(),
      logout: () => contextValue.authService!.logout()
    }),
    // eslint-disable-next-line
    [contextValue.loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
