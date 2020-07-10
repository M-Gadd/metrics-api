import { useSubmit } from "../hooks/useMetrics";
import { Row, Col } from "reactstrap";
import React from "react";

export interface SumMetricsProps {
  metric: string;
}

const SumMetrics: React.SFC<SumMetricsProps> = ({ metric }) => {
  const { sumMetrics, isLoading } = useSubmit(metric);

  if (isLoading) {
    return (
      <Row>
        <Col>
          <h3 className="mt-4" style={{ color: "white" }}>
            Calculating your sum
          </h3>
        </Col>
      </Row>
    );
  }
  return (
    <>
      {sumMetrics && (
        <h3 className="mt-4" style={{ color: "white" }}>
          {sumMetrics}
        </h3>
      )}
    </>
  );
};

export default SumMetrics;
