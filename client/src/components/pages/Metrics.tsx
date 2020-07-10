import React, { useState } from "react";
import { Container, Row, Col, Input, Button } from "reactstrap";
import api from "../../api";
import SumMetrics from "../SumMetrics";

export interface MetricsProps {}

const Metrics: React.SFC<MetricsProps> = () => {
  const [postMetric, setPostMetric] = useState("");
  const [value, setValue] = useState("");
  const [sumMetric, setSumMetric] = useState("");
  const [showSum, setShowSum] = useState(false);

  const handlePost = async () => {
    if (postMetric !== "" && value !== "") {
      await api.postMetrics(postMetric, { value });
      setPostMetric("");
      setValue("");
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center mt-5">
        <Col xs={3}>
          <Input
            type="text"
            placeholder="Post Metric (e.g. active_visitors)"
            name="Metric"
            className=""
            value={postMetric}
            onChange={(e) => {
              setSumMetric("");
              setShowSum(false);
              setPostMetric(e.target.value);
            }}
          />
        </Col>

        <Col xs={3}>
          <Input
            type="text"
            placeholder="value (e.g. 4)"
            name="Metric"
            className=""
            value={value}
            onChange={(e) => {
              setSumMetric("");
              setShowSum(false);
              setValue(e.target.value);
            }}
          />
        </Col>
        <Col xs={1}>
          <Button onClick={handlePost} color="danger">
            Post
          </Button>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center mt-5">
        <Col xs={5}>
          <Input
            type="text"
            placeholder="Metric to be summed for last hour (e.g. active_visitors)"
            name="Metric"
            className=""
            value={!showSum ? sumMetric : ""}
            onChange={(e) => {
              setShowSum(false);
              setSumMetric(e.target.value);
            }}
          />
        </Col>
        <Col xs={1}>
          <Button onClick={() => setShowSum(true)} color="success">
            Sum
          </Button>
        </Col>
      </Row>

      {showSum && sumMetric && <SumMetrics metric={sumMetric} />}
    </Container>
  );
};

export default Metrics;
