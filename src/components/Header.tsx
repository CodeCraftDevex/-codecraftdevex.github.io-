import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import styles from "./Header.module.scss";
function Header() {
  return (
    <header className="mb-auto">
      <Navbar bg="transparent" expand="lg" className="nav-masthead">
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
              <span className={styles.letterAnimation + " " + styles.letter3}>
                r
              </span>
              <span className={styles.letterAnimation + " " + styles.letter4}>
                t
              </span>
              <span className={styles.letterAnimation + " " + styles.letter5}>
                a
              </span>
              <span className={styles.letterAnimation + " " + styles.letter6}>
                f
              </span>
              <span className={styles.letterAnimation + " " + styles.letter7}>
                o
              </span>
              <span className={styles.letterAnimation + " " + styles.letter8}>
                l
              </span>
              <span className={styles.letterAnimation + " " + styles.letter9}>
                i
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
              <Link href="/proyectos" className="nav-link fw-bold py-1 px-0">
                Proyectos
              </Link>
              <Link href="/contacto" className="nav-link fw-bold py-1 px-0">
                Contacto
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
