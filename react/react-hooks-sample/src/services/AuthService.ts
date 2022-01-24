import { GitProvider } from "../types";
import TransactionManager from "../utils/TransactionManager";
import { oauthToken, encodeState, validateCrypto, createRandomString, logout } from "../utils/auth";
import Cache from "../utils/Cache";
import * as ClientStorage from "../utils/storage";

interface IRedirectLoginResult {
  /**
   * State stored when the redirect request was made
   */
  appState?: any;
}

export default class AuthService {
  private cache: Cache;
  private transactionManager: TransactionManager;

  constructor() {
    this.cache = new Cache();
    this.transactionManager = new TransactionManager();
  }

  async redirectToInternalLogin(redirectTo: string) {
    const searchParams = new URLSearchParams({ redirectTo });
    const url = redirectTo ? `/login?${searchParams}` : "/login";
    window.location.assign(url);
  }

  async loginWithRedirect(gitProvider: GitProvider, appState: any) {
    const stateIn = encodeState(createRandomString());

    this.transactionManager.create(stateIn, { appState });

    const searchParams = new URLSearchParams({ provider: gitProvider, state: stateIn });

    window.location.assign(`${process.env.REACT_APP_API_URL}/authorize?${searchParams}`);
  }

  async handleRedirectCallback(url: string = window.location.href): Promise<IRedirectLoginResult> {
    const urlObj = new URL(url);
    const status = urlObj.searchParams.get("grauth");
    const errorMsg = urlObj.searchParams.get("message");
    const state = urlObj.searchParams.get("state");

    if (status !== "ok") {
      this.transactionManager.remove(state || "");
      throw new Error(errorMsg!);
    }

    const transaction = this.transactionManager.get(state || "");
    if (!transaction) {
      console.log("Invalid state");
    }
    this.transactionManager.remove(state || "");

    const authResult = await oauthToken();
    this.cache.save(authResult);
    ClientStorage.save("gr.auth.is.authenticated", true, {
      expires: new Date(authResult.exp * 1000)
    });

    return {
      appState: transaction && transaction.appState
    };
  }

  async getTokenSilently() {
    const authResult = await oauthToken();
    this.cache.save(authResult);
    ClientStorage.save("gr.auth.is.authenticated", true, {
      expires: new Date(authResult.exp * 1000)
    });
  }

  isAuthenticated() {
    const user = this.getUser();
    return !!user;
  }

  getUser() {
    const cache = this.cache.get();
    return cache && cache.user;
  }

  getIdentity() {
    const cache = this.cache.get();
    return cache;
  }

  async logout() {
    ClientStorage.remove("gr.auth.is.authenticated");
    await logout();
    window.location.assign("/");
  }
}

export async function createAuthService() {
  validateCrypto();

  const authService = new AuthService();

  if (!ClientStorage.get("gr.auth.is.authenticated")) {
    return authService;
  }
  try {
    await authService.getTokenSilently();
  } catch (error) {
    // ignore
  }
  return authService;
}
