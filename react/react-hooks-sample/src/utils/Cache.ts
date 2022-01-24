import { GitProvider } from "../types";

export interface IUser {
  id: string;
  username: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface ICacheEntry {
  provider: GitProvider;
  githubAccessToken?: string;
  gitlabAccessToken?: string;
  exp: number;
  user: IUser;
}

interface ICachedTokens {
  [key: string]: ICacheEntry;
}

const createKey = () => `grCache`;

const getExpirationTimeoutInMilliseconds = (exp: number) => {
  const expTime = new Date(exp * 1000).getTime() - new Date().getTime();
  return expTime * 0.8;
};

export default class Cache {
  cache: ICachedTokens = {};

  save(entry: ICacheEntry) {
    const key = createKey();
    this.cache[key] = entry;
    const timeout = getExpirationTimeoutInMilliseconds(entry.exp);
    setTimeout(() => {
      delete this.cache[key];
    }, timeout);
  }

  get() {
    return this.cache[createKey()];
  }
}
