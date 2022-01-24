import { toast } from "react-toastify";
import { IAccount, GitProvider } from "../types/index";
import { shortGP } from "../utils/uri";

export const handleGithubInstallationRedirect = (
  query: URLSearchParams,
  accountsMap: Map<GitProvider, IAccount[]>,
  t: any
) => {
  if (isGithubInstallationRedirect(query)) {
    const accounts = accountsMap.get("github");

    if (accounts) {
      const account = accounts.find(a => String(a.gitMetadata.id) === query.get("installation_id"));

      if (account) {
        const message =
          query.get("setup_action") === "install"
            ? t("The installation has been successful")
            : t("The installation has been updated");

        toast.info(message);

        return `/gh/${account!.login}`;
      }
    }
  }

  return false;
};

export const handleSubscriptionRedirect = (
  plan: string,
  billing: string | null,
  defaultGitProvider: GitProvider,
  defaultAccountName: string
) => {
  if (["open_source", "startup", "business"].includes(plan)) {
    const q = new URLSearchParams([["plan", plan], ["billing", billing || "yearly"]]);
    return `/${shortGP(
      defaultGitProvider!
    )}/${defaultAccountName}/settings/subscription?${q.toString()}`;
  }

  return false;
};

const isGithubInstallationRedirect = (query: URLSearchParams) => {
  const installationId = query.get("installation_id");
  const setupAction = query.get("setup_action");
  return installationId && setupAction && ["install", "update"].includes(setupAction);
};
