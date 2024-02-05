import React, { useState } from "react";
import axios from "axios";
import { Container, Spinner, Table, Accordion } from "react-bootstrap";
import styles from "./taxbasecalculation.module.scss";
import CustomButton from "./CustomButton";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type Resultado = {
  tiempos: {
    consolidarYProcesarPorFecha: number;
    encadenarTransacciones: number;
    convertirTransaccionesAEur: number;
    calcularBaseImponible: number;
    total: number;
  };
  totales: {
    profitTotal?: number;
    amountTotal: number;
    amountTotalEur: number;
    profitTotalEur?: number;
    longitudListado: number[];
    baseImponibleTotal?: number;
    grupos: number;
    totalAmount?: number;
    totalProfit?: number;
    baseImponible?: number;
  };
};
const codeString = `# Tu código Python aquí
def ejemplo():
    print("Hola, mundo!")
`;
const TaxBaseCalculation = () => {
  const [resultado, setResultado] = useState<{
    resultadoPandas: Resultado;
    resultadoConvencional: Resultado;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDatos = async () => {
    setIsLoading(true);
    const url = `${process.env.NEXT_PUBLIC_RESTFUL_SERVER_URL}/base_imponible/calculo-base-imponible/`;
    try {
      const response = await axios.get(url);
      // setResultado(response.data);
      setResultado({
        resultadoPandas: response.data.resultado_pandas,
        resultadoConvencional: response.data.resultado_convencional,
      });
    } catch (error) {
      console.error("Error al obtener los datos", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateTableRows = (resultado: {
    resultadoPandas: Resultado;
    resultadoConvencional: Resultado;
  }) => {
    const rows = [];
    // Tiempos
    const entries = Object.entries(resultado.resultadoPandas.tiempos);

    for (const [key, value] of entries.slice(0, -1)) {
      const readableKey = key.replace(/_/g, " ");
      rows.push(
        <tr key={key}>
          <td className={styles.firstColumn}>{readableKey}</td>
          <td>
            <Accordion>
              <Accordion.Item eventKey={key}>
                <Accordion.Header>{value.toFixed(4)}</Accordion.Header>
                <Accordion.Body>
                  <SyntaxHighlighter language="python" style={atomOneDark}>
                    {codeString}
                  </SyntaxHighlighter>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </td>
          <td>
            <Accordion>
              <Accordion.Item eventKey={key}>
                <Accordion.Header>{value.toFixed(4)}</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </td>
        </tr>
      );
    }

    return rows;
  };

  return (
    <Container>
      <CustomButton onClick={fetchDatos} size="sm" disabled={isLoading}>
        {isLoading ? "Cargando..." : "Calcular Base Imponible"}
      </CustomButton>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : resultado ? (
        <div>
          <h4>Comparativa de rendimiento</h4>
          <p className="small">
            Comparación entre el rendimiento de cálculos con DataFrames de
            Pandas y la versión iterativa con bucles en Python.
          </p>
          <Table
            striped
            bordered
            hover
            variant="dark"
            className={styles.tableCustom}
          >
            <thead>
              <tr>
                <th></th>
                <th>
                  Pandas {resultado.resultadoPandas.tiempos.total.toFixed(2)}{" "}
                  seg.
                </th>
                <th>
                  Convencional{" "}
                  {resultado.resultadoConvencional.tiempos.total.toFixed(2)}{" "}
                  seg.
                </th>
              </tr>
            </thead>
            <tbody>{generateTableRows(resultado)}</tbody>
          </Table>
        </div>
      ) : (
        <p>Inicia un cálculo para ver los resultados.</p>
      )}
    </Container>
  );
};

export default TaxBaseCalculation;
