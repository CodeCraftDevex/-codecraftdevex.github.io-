import React, { useState } from "react";
import { Container, Row, Col, Nav, Image } from "react-bootstrap";
import { projectsContent, projectsLogo } from "../data/listado_proyectos";
import PDFIntercalator from "../components/PDFIntercalator";
import useWindowSize from "../hooks/useWindowSize";
import styles from "./proyectos.module.scss";

const Sidebar: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(selectedProjectId === projectId ? null : projectId);
  };

  return (
    <Nav className={styles.sidebar + " flex-column"}>
      {projectsLogo.map((project) => (
        <Nav.Link
          className={styles.navLink}
          href={`#${project.id}`}
          key={project.id}
          onClick={() => handleProjectClick(project.id)}
        >
          <Image
            src={project.image.src}
            alt={project.title}
            fluid
            className={`${styles.projectImage} ${
              selectedProjectId === project.id ? styles.selected : ""
            }`}
            draggable="false"
          />

          {/* {selectedProjectId === project.id && (
            <h3
              className={`${styles.projectTitle} ${
                selectedProjectId === project.id
                  ? styles.projectTitleVisible
                  : ""
              }`}
            >
              {project.title}
            </h3>
          )} */}
        </Nav.Link>
      ))}
    </Nav>
  );
};

const Proyectos: React.FC = () => {
  const { width } = useWindowSize();
  const isMobile = width !== undefined && width <= 768;

  return (
    <main>
      <Container className="px-3" fluid>
        <Row>
          {!isMobile && (
            <Col md={2} className={styles.sidebarCol}>
              <Sidebar />
            </Col>
          )}
          <Col md={isMobile ? 12 : 10}>
            <Row id="pdfIntercalator">
              <Col md={12}>
                <PDFIntercalator />
              </Col>
              <hr className={styles.projectDivider} />
            </Row>
            {projectsContent.map((project) => (
              <Row id={project.id} key={project.id}>
                <Col md={7}>
                  <h2 className={styles.projectHeading + " fw-normal lh-1"}>
                    {project.title}
                  </h2>
                  <p className="lead">{project.description}</p>
                </Col>
                <Col md={5}>
                  <Image src={project.image.src} alt={project.title} fluid />
                </Col>
                <hr className={styles.projectDivider} />
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Proyectos;
