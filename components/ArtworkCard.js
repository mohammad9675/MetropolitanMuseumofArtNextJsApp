import Error from "next/error";
import Link from "next/link";
import React from "react";
import { Button, Card } from "react-bootstrap";
import useSWR from "swr";

function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );
  if (error) return <Error statusCode={404} />;
  if (data)
    return (
      <>
        <Card>
          <Card.Img
            variant="top"
            src={
              data.primaryImageSmall && data.primaryImageSmall.length
                ? data.primaryImageSmall
                : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
            }
          />
          <Card.Body>
            <Card.Title>{data.title ?? "N/A"}</Card.Title>
            <Card.Text>
              <strong>Date: </strong>
              {data.objectDate ?? "N/A"}
              <br />
              <strong>Classification: </strong>
              <br />
              {data.classification ?? "N/A"}
              <strong>Medium: </strong>
              {data.medium ?? "N/A"}
            </Card.Text>
            <Link href={`/artwork/${data.objectID}`} passHref>
              <Button variant="outline-primary">
                <strong>ID:</strong>
                {data.objectID}
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </>
    );
  return null;
}

export default ArtworkCard;
