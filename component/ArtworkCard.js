import useSWR from "swr";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import Error from "next/error";

export default function ArtworkCard(props) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
  );
  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={
            data.primaryImageSmall
              ? data.primaryImageSmall
              : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
          }
        />
        <Card.Body>
          <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>
            {data.objectDate ? data.objectDate : "N/A"}
            <br />
            <strong>Classification: </strong>
            {data.classification ? data.classification : "N/A"}
            <br />
            <strong>Medium: </strong>
            {data.medium ? data.medium : "N/A"}
            <br />
            <br />
            <Link href={`/artwork/${props.objectID}`} passHref>
              <Button variant="primary">ID: {props.objectID}</Button>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
