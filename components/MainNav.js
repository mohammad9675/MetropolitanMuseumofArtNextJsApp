import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form, FormControl, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { searchHistoryAtom } from "../store";
import { addToHistory } from "../lib/userData";
import { removeToken, readToken } from "../lib/authenticate";

function MainNav() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const submitForm = async (e) => {
    e.preventDefault();
    setIsExpanded(false);
    router.push(`/artwork?title=true&q=${query}`);
    setSearchHistory(await addToHistory(`title=true&q=${query}`));
    e.target.reset();
  };
  let token = readToken();

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }
  return (
    <>
      <Navbar
        className="fixed-top navbar-dark bg-primary"
        variant="light"
        expand="lg"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Mohammadhassan Khalilian</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded((expanded) => !expanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={() => setIsExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            {token && (
              <Form className="d-flex" onSubmit={submitForm}>
                <FormControl
                  value={query}
                  onChange={(res) => setQuery(res.currentTarget.value)}
                  className="me-2"
                  placeholder="search"
                />
                <Button type="submit" variant="success">
                  Search
                </Button>
              </Form>
            )}
            {token ? (
              <Nav>
                <NavDropdown
                  title={token.userName}
                  id="basic-nav-dropdown"
                  active={
                    router.pathname === "/favourites" ||
                    router.pathname === "/history"
                  }
                >
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === "/favourites"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === "/history"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    onClick={(e) => {
                      setIsExpanded(false);
                    }}
                    active={router.pathname === "/register"}
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    onClick={(e) => {
                      setIsExpanded(false);
                    }}
                    active={router.pathname === "/login"}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default MainNav;
