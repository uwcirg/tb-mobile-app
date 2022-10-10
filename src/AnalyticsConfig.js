import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import React from "react";

const isConfigured =
  window &&
  window._env &&
  window._env.MATOMO_URL &&
  window._env.MATOMO_ID &&
  window._env.MATOMO_URL != "not_set" &&
  window._env.MATOMO_ID != "not_set";

const MatomoConfig = (props) => {
  if (isConfigured) {
    const instance = createInstance({
      urlBase: window._env.MATOMO_URL,
      siteId: window._env.MATOMO_ID,
    });

    return <MatomoProvider value={instance}>{props.children}</MatomoProvider>;
  }

  return <>{props.children}</>;
};

export default MatomoConfig;
