import { useRouter } from "next/router";
import React from "react";
import { Col, Row } from "react-bootstrap";
import ArtworkCardDetail from "../../components/ArtworkCardDetail";

function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;
  return (
    <Row>
      <Col>
        <ArtworkCardDetail objectID={objectID} />
      </Col>
    </Row>
  );
}

export default ArtworkById;
