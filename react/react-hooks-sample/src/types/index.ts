import { IGitlabGroup, GitlabGroupKind } from "./gitlab";
import { IGithubInstallation } from "./github";

export type GitProvider = "github" | "gitlab";

export interface IAccount extends IGRAccount {
  avatar_url: string;
  url: string;
  kind: GitlabGroupKind | undefined;
  email: string | undefined;
  state: string | undefined;
  organization: string | undefined;
  gitMetadata: IGithubInstallation | IGitlabGroup;
}

interface IGRAccount {
  idAccount: number;
  installationId: number | null;
  login: string;
  provider: string;
  providerInternalId: number;
  type: "User" | "Organization";
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  configuration: IGRAccountConfig | null;
  cliToken: string;
  glPersonalAccessToken: string | null;
}

export type IGRAccountConfigBundles = "auto" | {};

export interface IGRAccountConfig {
  bundles: IGRAccountConfigBundles;
  notifications: {
    slack: {
      enabled: boolean;
      notify: "onAllScans" | "whenScanHasFindingsOnly";
      webhookUrl: string;
    };
  } | null;
  report: {
    pullRequest: {
      comment: boolean;
      findings: "onAllFiles" | "onChangedFilesOnly" | "onChangedLinesOnly";
    };
  };
}
