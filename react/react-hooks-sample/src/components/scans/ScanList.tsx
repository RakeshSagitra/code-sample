import React, { Fragment, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import useSortable from "../../hooks/useSortable";
import GRTable from "../common/table/GRTable";
import { Table } from "semantic-ui-react";
import ScanRow from "./ScanRow";
import GRFilters from "../common/GRFilters";
import ScanTableHeader from "./ScanTableHeader";

interface IProps {
  scans?: any[];
  loading?: boolean;
}

const ScanList = ({ scans = [], loading = false }: IProps) => {
  const { t } = useTranslation();
  const { data, toggleSort, currentColumn, direction } = useSortable(scans, "num");
  const [filter, setFilter] = useState<string>();

  const q = filter?.toLowerCase();
  const filteredData = data.filter(
    b =>
      !q ||
      b.lastCommitComment.toLowerCase().includes(q) ||
      b.branch.toLowerCase().includes(q) ||
      b.repository.name.includes(q)
  );

  return (
    <Fragment>
      <GRFilters setFilter={setFilter} placeholder={`${t("Find a scan")}...`} />
      <GRTable sortable fixed singleLine size="small" loading={loading}>
        <ScanTableHeader
          currentColumn={currentColumn}
          sortDirection={direction}
          handleSort={toggleSort}
        />
        <Table.Body>
          {filteredData.map(scan => (
            <ScanRow key={scan.id} scan={scan} />
          ))}
        </Table.Body>
      </GRTable>
    </Fragment>
  );
};

export default memo(ScanList);
