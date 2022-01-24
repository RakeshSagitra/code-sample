import jwtDecode from "jwt-decode";
import axios from "axios";
import { ICacheEntry } from "./Cache";

export const oauthToken = async () => {
  const { data } = await axios(`${process.env.REACT_APP_API_URL}/token`, {
    withCredentials: true
  });

  return jwtDecode<ICacheEntry>(data);
};

export const logout = async () => {
  return axios(`${process.env.REACT_APP_API_URL}/logout`, { withCredentials: true });
};

export const createRandomString = () => {
  const charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_~.";
  let random = "";
  const randomValues = Array.from(getCrypto().getRandomValues(new Uint8Array(43)));
  randomValues.forEach(v => (random += charset[v % charset.length]));
  return random;
};

export const encodeState = (state: string) => btoa(state);
export const decodeState = (state: string) => atob(state);

export const getCrypto = () => {
  // ie 11.x uses msCrypto
  return (window.crypto || (window as any).msCrypto) as Crypto;
};

export const getCryptoSubtle = () => {
  const crypto = getCrypto();
  // safari 10.x uses webkitSubtle
  return crypto.subtle || (crypto as any).webkitSubtle;
};

export const validateCrypto = () => {
  if (!getCrypto()) {
    throw new Error("For security reasons, `window.crypto` is required to run our auth.");
  }
  if (typeof getCryptoSubtle() === "undefined") {
    throw new Error("gr-auth-spa must run on a secure origin.");
  }
};
