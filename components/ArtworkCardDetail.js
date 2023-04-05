import Error from "next/error";
import React from "react";
import { Button, Card } from "react-bootstrap";
import useSWR from "swr";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { useState, useEffect } from "react";
import { addToFavourites, removeFromFavourites } from "../lib/userData";

function ArtworkCardDetail(props) {
  const { data, error } = useSWR(
    props.objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
      : null
  );

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);
  useEffect(() => {
    setShowAdded(favouritesList?.includes(props.objectID));
  }, [favouritesList]);

  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(props.objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(props.objectID));
      setShowAdded(true);
    }
  }
  if (error) return <Error statusCode={404} />;
  if (data)
    return (
      <>
        <Card>
          {data.primaryImage && data.primaryImage.length && (
            <Card.Img src={data.primaryImage} />
          )}
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>
              <strong>Date: </strong>
              {data.objectDate ?? "N/A"}
              <br />
              <strong>Classification: </strong>
              <br />
              {data.classification ?? "N/A"}
              <strong>Medium: </strong>
              {data.medium ?? "N/A"}
              <br />
              <br />
              <strong>Artist: </strong>
              {data.artistDisplayName ? (
                <>
                  {data.artistDisplayName} (
                  <a
                    target_blank
                    href={data.artistWikidata_URL}
                    rel="noreferrer"
                  >
                    wiki
                  </a>
                  )
                </>
              ) : (
                "N/A"
              )}
              <br />
              <strong>Credit Line: </strong> {data.creditLine ?? "N/A"}
              <br />
              <strong>Dimensions: </strong>
              {data.dimensions ?? "N/A"}
            </Card.Text>
            <Button
              variant={showAdded ? "primary" : "outline-primary"}
              onClick={favouritesClicked}
            >{`+ Favourite ${showAdded ? "(added)" : ""}`}</Button>
          </Card.Body>
        </Card>
      </>
    );
  return null;
}

export default ArtworkCardDetail;
