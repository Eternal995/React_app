import useSWR from "swr";
import { Card, Button } from "react-bootstrap";
import Error from "next/error";
import { useState } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";

export default function ArtworkCardDetail(props) {
  const { data, error } = useSWR(
    props.objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
      : null
  );
  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(
    favouritesList.includes(props.objectID)
  );
  console.log(favouritesList);

  const favouritesClicked = () => {
    if (showAdded) {
      setFavouritesList((current) =>
        current.filter((fav) => fav != props.objectID)
      );
    } else {
      setFavouritesList((current) => [...current, props.objectID]);
    }
    setShowAdded(!showAdded);
  };

  return (
    <>
      <Card>
        {data.primaryImage && (
          <Card.Img variant="top" src={data.primaryImage} />
        )}
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

            <strong>Artist: </strong>
            {data.artistDisplayName ? data.artistDisplayName : "N/A"}
            {data.artistWikidata_URL && (
              <>
                {" ( "}
                <a
                  href={data.artistWikidata_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  wiki
                </a>
                {" ) "}
              </>
            )}
            <br />
            <strong>Credit Line: </strong>
            {data.creditLine ? data.creditLine : "N/A"}
            <br />
            <strong>Dimensions: </strong>
            {data.dimensions ? data.dimensions : "N/A"}
            <br />
            <Button
              variant={showAdded ? "primary" : "outline-primary"}
              onClick={favouritesClicked}
            >
              + Favourite {showAdded ? "(added)" : ""}
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
