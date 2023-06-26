/*********************************************************************************
 *  WEB422 – Assignment 4
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Yongda Long Student ID: 172800211 Date: Jun 26, 2023
 *
 ********************************************************************************/

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Col, Pagination, Card } from "react-bootstrap";
import useSWR from "swr";
import ArtworkCard from "@/component/ArtworkCard";
import Error from "next/error";

export default function Artwork() {
  const PER_PAGE = 12;

  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  const previousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const nextPage = () => {
    if (page < artworkList.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (data) {
      let results = [];
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) return <Error statusCode={404} />;
  if (!artworkList) return null;

  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <Card.Text>
                <h4>Nothing Here</h4>Try searching for something else.
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Row>
      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}
