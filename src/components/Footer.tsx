import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

function FooterExample() {
  return (
    <footer className="mt-auto text-white-50">
      <Container className="mt-5">
        <Row>
          <Col>
            <p>
              Este sitio web ha sido creado utilizando{" "}
              <Link href="https://reactjs.org/" className="text-white">
                Next.js
              </Link>{" "}
              y{" "}
              <Link
                href="https://react-bootstrap.github.io/"
                className="text-white"
              >
                React-Bootstrap
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterExample;
