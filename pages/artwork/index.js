import Error from "next/error";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Pagination, Row } from "react-bootstrap";
import useSWR from "swr";
import ArtworkCard from "../../components/ArtworkCard";
import validObjectIDList from "../../public/data/validObjectIDList.json";

const PER_PAGE = 12;

function Artwork() {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  function previousPage() {
    if (page > 1) setPage((prev) => prev - 1);
  }
  function nextPage() {
    if (page < artworkList.length) setPage((prev) => prev + 1);
  }

  useEffect(() => {
    if (!data) return;
    const results = [];
    let filteredResults = validObjectIDList.objectIDs.filter((x) =>
      data.objectIDs?.includes(x)
    );

    for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
      const chunk = filteredResults.slice(i, i + PER_PAGE);
      results.push(chunk);
    }
    setArtworkList(results);
    setPage(1);
  }, [data]);

  if (error) <Error statusCode={404} />;
  if (!artworkList) return null;
  if (artworkList && artworkList.length)
    return (
      <>
        <Row className="gy-4">
          {artworkList[page - 1].map((currentObjectID, index) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))}
        </Row>
        <br />
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      </>
    );
  else return <h4>Nothing Here</h4>;
}

export default Artwork;
