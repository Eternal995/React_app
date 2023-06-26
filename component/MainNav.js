import {
  Container,
  Nav,
  Navbar,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function MainNav() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (search) router.push(`/artwork?title=true&q=${search}`);
  };

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-primary">
        <Container>
          <Navbar.Brand>Yongda Long</Navbar.Brand>
          <Navbar.Collapse>
            <Nav className="me-auto my-2 my-lg-0">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link>Advanced Search</Nav.Link>
              </Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit" variant="success">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
