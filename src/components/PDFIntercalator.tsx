import React, { useState, useCallback } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { useDropzone } from "react-dropzone";
import CustomButton from "./CustomButton";
import { FaRegClone } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { Container, Col, Row } from "react-bootstrap";

const PDFIntercalator = () => {
  const [oddFile, setOddFile] = useState<File>();
  const [evenFile, setEvenFile] = useState<File>();
  const [rotate, setRotate] = useState<boolean>(false);
  // Nuevos estados para los nombres de los archivos
  const [oddFileName, setOddFileName] = useState("");
  const [evenFileName, setEvenFileName] = useState("");

  const onDropOdd = useCallback((acceptedFiles: File[]) => {
    setOddFile(acceptedFiles[0]);
    setOddFileName(acceptedFiles[0].name); // Guardar el nombre del archivo
  }, []);

  const onDropEven = useCallback((acceptedFiles: File[]) => {
    setEvenFile(acceptedFiles[0]);
    setEvenFileName(acceptedFiles[0].name); // Guardar el nombre del archivo
  }, []);

  const dropzoneStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    padding: "20px",
    borderWidth: "2px",
    borderRadius: "2px",
    borderStyle: "dashed",
    backgroundColor: "rgba(0, 0, 0, 0)",
    outline: "none",
  };

  const { getRootProps: getRootPropsOdd, getInputProps: getInputPropsOdd } =
    useDropzone({
      onDrop: onDropOdd,
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: false,
    });

  const { getRootProps: getRootPropsEven, getInputProps: getInputPropsEven } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
      },
      onDrop: onDropEven,
      multiple: false,
    });
  const interleavePDFs = async () => {
    if (oddFile && evenFile) {
      const oddPdfBytes = await oddFile.arrayBuffer();
      const evenPdfBytes = await evenFile.arrayBuffer();

      const oddPdfDoc = await PDFDocument.load(oddPdfBytes);
      const evenPdfDoc = await PDFDocument.load(evenPdfBytes);
      const combinedPdfDoc = await PDFDocument.create();

      const maxPages = Math.max(
        oddPdfDoc.getPageCount(),
        evenPdfDoc.getPageCount()
      );

      for (let i = 0; i < maxPages; i++) {
        if (i < oddPdfDoc.getPageCount()) {
          const oddPage = await combinedPdfDoc.copyPages(oddPdfDoc, [i]);
          if (rotate) {
            oddPage[0].setRotation(degrees(180));
          }
          combinedPdfDoc.addPage(oddPage[0]);
        }
        if (i < evenPdfDoc.getPageCount()) {
          const evenPage = await combinedPdfDoc.copyPages(evenPdfDoc, [i]);
          if (rotate) {
            evenPage[0].setRotation(degrees(180));
          }
          combinedPdfDoc.addPage(evenPage[0]);
        }
      }

      // Crear el PDF combinado y descargarlo
      const pdfBytes = await combinedPdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "combined.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Col xs={12} md={4}>
          <div>
            <h4>Intercalador de Páginas</h4>
            <p className="small">
              Esta herramienta es ideal para quienes necesitan escanear
              documentos por una sola cara. Permite juntar y rotar archivos PDF
              escaneados de manera sencilla.
              <span className="font-weight-bold text-primary">
                Todo el proceso se realiza de forma local,
              </span>
              garantizando que tus archivos no se suban a ningún sitio.
              <span className="font-weight-bold">
                Es de uso personal y está disponible para cualquier usuario que
                lo necesite, ejecutándose directamente en tu máquina.
              </span>
            </p>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div {...getRootPropsOdd({ style: dropzoneStyle })}>
            <input {...getInputPropsOdd()} />
            {!oddFileName && (
              <p className="w-100 text-center small">
                Arrastra aquí el archivo impar o haz clic para seleccionarlo
              </p>
            )}
            {oddFileName && (
              <p
                className="w-100 text-center small"
                style={{ textAlign: "center" }}
              >
                {oddFileName}
              </p>
            )}
          </div>
          <div {...getRootPropsEven({ style: dropzoneStyle })}>
            <input {...getInputPropsEven()} />
            {!evenFileName && (
              <p className="w-100 text-center small">
                Arrastra aquí el archivo par o haz clic para seleccionarlo
              </p>
            )}
            {evenFileName && (
              <p
                className="w-100 text-center small"
                style={{ textAlign: "center" }}
              >
                {evenFileName}
              </p>
            )}
          </div>
        </Col>
        <Col xs={12} md={2}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label htmlFor="rotateCheckbox">
              <FaArrowsRotate /> Rotar
            </label>
            <input
              type="checkbox"
              id="rotateCheckbox"
              checked={rotate}
              onChange={() => setRotate(!rotate)}
            />
          </div>
          <div className="mt-2">
            <CustomButton onClick={interleavePDFs} size="sm">
              <FaRegClone /> Intercalar
            </CustomButton>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PDFIntercalator;
