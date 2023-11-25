import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import styles from "./Header.module.scss";
function Header() {
  return (
    <header className={styles.mbAuto}>
      <Navbar bg="transparent" expand="lg" className={styles.navMasthead}>
        <Container>
          <Link href="/">
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
                {/* <a
                  className={styles.navLink + " fw-bold py-1 px-0"}
                  style={{ cursor: "none" }}
                > */}
                Proyectos
                {/* </a> */}
              </Link>
              <Link href="/contacto" passHref>
                {/* <a
                  className={styles.navLink + " fw-bold py-1 px-0"}
                  style={{ cursor: "none" }}
                > */}
                Contacto
                {/* </a> */}
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
