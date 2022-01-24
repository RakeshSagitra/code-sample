import React, { memo } from "react";
import FindingItem from "../findings/FindingItem";
import GRAccordionContent from "../common/GRAccordionContent";

interface IProps {
  scan: any;
}

const ScanDetail = ({ scan }: IProps) => {
  return (
    <GRAccordionContent compact leftMargined>
      {scan.findings.map((finding: any) => (
        <FindingItem key={finding.id} finding={finding} />
      ))}
    </GRAccordionContent>
  );
};

export default memo(ScanDetail, (prevProps, nextProps) => prevProps.scan.id === nextProps.scan.id);
