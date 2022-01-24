import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import useScans from "../hooks/useScans";
import ScanList from "../components/scans/ScanList";

const Scans = () => {
  const { t } = useTranslation();
  const { scans, loading } = useScans();

  // eslint-disable-next-line
  const memoizedScans = useMemo(() => scans, [loading]);

  return (
    <>
      <Helmet>
        <title>{t("Scans")}</title>
      </Helmet>
      <div className="padded-content">
        <h1>{t("Scans")}</h1>
        <div className="page-segment">
          <ScanList scans={memoizedScans} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default Scans;
