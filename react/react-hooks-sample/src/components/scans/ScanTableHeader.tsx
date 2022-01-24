import React, { memo } from "react";
import { Table } from "semantic-ui-react";
import { Direction } from "../../hooks/useSortable";
import { useTranslation } from "react-i18next";

interface IProps {
  currentColumn: string;
  sortDirection: Direction;
  handleSort: (column: string) => void;
}

const ScanTableHeader = ({ currentColumn, sortDirection, handleSort }: IProps) => {
  const { t } = useTranslation();
  const onTHClick = (e: React.MouseEvent<HTMLElement>) => {
    const column = e.currentTarget.getAttribute("data-column");
    if (column) {
      handleSort(column);
    }
  };
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell
          width="10"
          sorted={currentColumn === "num" ? sortDirection : undefined}
          data-column="num"
          onClick={onTHClick}
        >
          {t("All Scans")}
        </Table.HeaderCell>
        <Table.HeaderCell width="2" className="no-sort">
          {t("Scan")}
        </Table.HeaderCell>
        <Table.HeaderCell
          width="2"
          sorted={currentColumn === "findings" ? sortDirection : undefined}
          data-column="findings"
          onClick={onTHClick}
        >
          {t("Findings")}
        </Table.HeaderCell>
        <Table.HeaderCell width="2" className="no-sort" />
      </Table.Row>
    </Table.Header>
  );
};

export default memo(ScanTableHeader);
