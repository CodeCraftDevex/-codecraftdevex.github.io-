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
              <Link href="https://reactjs.org/" passHref>
                {/* <a className="text-white" style={{ cursor: "none" }}> */}
                React
                {/* </a> */}
              </Link>{" "}
              y{" "}
              <Link href="https://react-bootstrap.github.io/" passHref>
                {/* <a className="text-white" style={{ cursor: "none" }}> */}
                React-Bootstrap
                {/* </a> */}
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterExample;
