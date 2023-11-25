import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Link from "next/link";
import styles from "./Header.module.scss";
function Header() {
  return (
    <header className={styles.mbAuto}>
      <Navbar bg="transparent" expand="lg" className={styles.navMasthead}>
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand
              style={{ fontSize: "1.8rem", color: "white", cursor: "none" }}
              className="fw-bold"
            >
              <span className={styles.letterAnimation + " " + styles.letter1}>
                P
              </span>
              <span className={styles.letterAnimation + " " + styles.letter2}>
                o
              </span>
              {/* ...otros span */}
              <span className={styles.letterAnimation + " " + styles.letter10}>
                o
              </span>
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ backgroundColor: "white" }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link href="/proyectos" passHref>
                <Nav.Link
                  className={styles.navLink + " fw-bold py-1 px-0"}
                  style={{ cursor: "none" }}
                >
                  Proyectos
                </Nav.Link>
              </Link>
              <Link href="/contacto" passHref>
                <Nav.Link
                  className={styles.navLink + " fw-bold py-1 px-0"}
                  style={{ cursor: "none" }}
                >
                  Contacto
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
