import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/component/ArtworkCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);
  console.log(favouritesList);

  return (
    <>
      <Row>
        {favouritesList.length > 0 ? (
          favouritesList.map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Nothing Here</h4>
              </Card.Title>
              <Card.Text>Try adding some new artwork to the list.</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Row>
    </>
  );
}
