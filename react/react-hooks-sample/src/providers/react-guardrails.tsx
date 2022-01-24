import React, { useState, useEffect, useContext, useMemo } from "react";
import { GitProvider, IAccount } from "../types";
import GRApiService from "../services/GRApiService";
import GitService from "../services/GitService";
import { useAuth } from "./auth/react-auth";
import { convertAccountsObjectToMap } from "../utils/git";
import gitServiceFactory from "../services/gitServiceFactory";

interface IGRContext {
  loading: boolean;
  defaultGitProvider?: GitProvider;
  gitServices?: Map<GitProvider, GitService>;
  defaultAccountName?: string;
  accounts?: Map<GitProvider, IAccount[]>;
}
interface IGRProviderOptions {
  children: React.ReactElement;
}
const initialValue: IGRContext = {
  loading: true
};

export const GRContext = React.createContext<IGRContext>(initialValue);
export const useGR = () => useContext(GRContext);
export const GRProvider = ({ children }: IGRProviderOptions) => {
  const [contextValue, setContextValue] = useState<IGRContext>(initialValue);
  const [, setState] = useState();

  const { getIdentity, loading: authLoading, isAuthenticated } = useAuth()!;

  useEffect(() => {
    (async () => {
      if (authLoading || !isAuthenticated) {
        return;
      }
      try {
        const identity = getIdentity();

        const defaultGitProvider = identity.provider;

        const { data } = await GRApiService.fetch(`v2/accounts`);
        const accounts: Map<GitProvider, IAccount[]> = convertAccountsObjectToMap(data);

        const defaultAccountName = accounts.get(defaultGitProvider)![0].login;

        const gitServices = gitServiceFactory(identity);

        setContextValue({
          defaultGitProvider,
          defaultAccountName,
          gitServices,
          accounts,
          loading: false
        });
      } catch (e) {
        setState(() => {
          throw e;
        });
      }
    })();
    // eslint-disable-next-line
  }, [authLoading, isAuthenticated]);

  // eslint-disable-next-line
  const value = useMemo(() => contextValue, [contextValue.loading]);

  return <GRContext.Provider value={value}>{children}</GRContext.Provider>;
};
