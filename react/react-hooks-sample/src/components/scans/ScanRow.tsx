/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Table, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import GRLabel from "../common/GRLabel";
import { Fragment, useState, memo } from "react";
import ScanDetail from "./ScanDetail";

interface IProps {
  scan: any;
}

const ScanRow = ({ scan }: IProps) => {
  const [open, setOpen] = useState(false);
  const scanHasFindings = scan.findings.length > 0;
  return (
    <Fragment>
      <Table.Row
        {...(scanHasFindings && {
          className: "clickable",
          onClick: () => {
            setOpen(!open);
          }
        })}
      >
        <Table.Cell>
          <div className="flex-image-40">
            <img src={scan.developerImage} alt={scan.developerImage} />
            <div>
              <Link to={`/`}>
                <span css={darkgreyStyles}>
                  {scan.repository.name}/{scan.branch}
                </span>{" "}
                #{scan.num}
              </Link>
              <div css={greyStyles}>{scan.lastCommitComment}</div>
            </div>
          </div>
        </Table.Cell>
        <Table.Cell>
          {scan.finishedAt}
          <div css={greyStyles}>{scan.executionTime}</div>
        </Table.Cell>
        <Table.Cell>
          <GRLabel color={scan.findings.length === 0 ? "green" : "red"}>
            {scan.findings.length}
          </GRLabel>
        </Table.Cell>
        <Table.Cell>
          <Icon name="chain" css={greyStyles} size="small" />
          <Link to={`/`}>{scan.sha}</Link>
        </Table.Cell>
      </Table.Row>
      {scanHasFindings && (
        <Table.Row {...(!open && { style: { display: "none" } })}>
          <Table.Cell colSpan={4} {...(open && { style: { borderTop: "none" } })}>
            <ScanDetail scan={scan} />
          </Table.Cell>
        </Table.Row>
      )}
    </Fragment>
  );
};

const darkgreyStyles = css({
  color: "#474b56"
});

const greyStyles = css({
  color: "#b6b6b6"
});

export default memo(ScanRow, (prevProps, nextProps) => prevProps.scan.id === nextProps.scan.id);
