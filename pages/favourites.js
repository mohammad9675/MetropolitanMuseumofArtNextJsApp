import { useAtom } from 'jotai'
import React from 'react'
import { Col, Pagination, Row } from 'react-bootstrap'
import ArtworkCard from '../components/ArtworkCard'
import { favouritesAtom } from '../store'

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)

  if (!favouritesList) return null;
  
  if (favouritesList && favouritesList.length)
    return (
      <>
        <Row className="gy-4">
          {favouritesList.map((currentObjectID, index) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))}
        </Row>
        <br />
      </>
    )
  else return <h4>Nothing Here</h4>;
}
