import React, { useState } from "react";

import { Container, Row, Col, Nav, Image } from "react-bootstrap";
import { projectsContent, projectsLogo } from "./listado_proyectos";
import PDFIntercalator from "./PDFIntercalator";
import useWindowSize from "../hooks/useWindowSize";
import "./Proyectos.scss";

const Sidebar: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(selectedProjectId === projectId ? null : projectId);
  };

  return (
    <Nav className="sidebar flex-column">
      {projectsLogo.map((project) => (
        <Nav.Link
          href={`#${project.id}`}
          key={project.id}
          onClick={() => handleProjectClick(project.id)}
        >
          <Image
            src={project.image}
            alt={project.title}
            fluid
            className={`project-image ${
              selectedProjectId === project.id ? "selected" : ""
            }`}
            draggable="false"
          />
          {selectedProjectId === project.id && (
            <h3
              className={`project-title ${
                selectedProjectId === project.id ? "project-title-visible" : ""
              }`}
            >
              {project.title}
            </h3>
          )}
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
            <Col md={2} className="sidebar-col">
              <Sidebar />
            </Col>
          )}
          <Col md={isMobile ? 12 : 10}>
            <Row className="proyecto" id="pdfIntercalator">
              <Col md={12}>
                <PDFIntercalator />
              </Col>
              <hr className="proyecto-divider" />
            </Row>
            {projectsContent.map((project) => (
              <Row className="proyecto" id={project.id}>
                <Col md={7}>
                  <h2 className="proyecto-heading fw-normal lh-1">
                    {project.title}
                  </h2>
                  <p className="lead">{project.description}</p>
                </Col>
                <Col md={5}>
                  <Image src={project.image} alt="Huerto" fluid />
                </Col>
                <hr className="proyecto-divider" />
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Proyectos;
