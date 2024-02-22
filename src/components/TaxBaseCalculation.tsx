import React, { useState } from "react";
import axios from "axios";
import { Container, Spinner, Table, Accordion } from "react-bootstrap";
import styles from "./taxbasecalculation.module.scss";
import CustomButton from "./CustomButton";
import GistLoader from "./GistLoader";
type Resultado = {
  tiempos: {
    consolidar_y_procesar_por_fecha: number;
    encadenar_transacciones: number;
    convertir_transacciones_a_eur: number;
    calcular_base_imponible: number;
    total: number;
  };
  codigos: {
    consolidar_y_procesar_por_fecha: string;
    encadenar_transacciones: string;
    convertir_transacciones_a_eur: string;
    calcular_base_imponible: string;
    total: string;
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

  const generateTableRows = ({
    resultadoPandas,
    resultadoConvencional,
  }: {
    resultadoPandas: Resultado;
    resultadoConvencional: Resultado;
  }) => {
    const rows = [];
    const entriesPandas = Object.entries(resultadoPandas.tiempos).slice(0, -1);
    const codigosPandas = Object.entries(resultadoPandas.codigos);
    const entriesConvencional = Object.entries(resultadoConvencional.tiempos);
    const codigosConvencional = Object.entries(resultadoConvencional.codigos);

    for (let i = 0; i < entriesPandas.length; i++) {
      const [keyPandas, valuePandas] = entriesPandas[i];
      const [keyConvencional, valueConvencional] = entriesConvencional[i];

      const readableKey = keyPandas.replace(/_/g, " ");

      rows.push(
        <tr key={keyPandas}>
          <td className={styles.firstColumn}>{readableKey}</td>
          <td>
            <Accordion>
              <Accordion.Item eventKey={`pandas-${keyPandas}`}>
                <Accordion.Header>{valuePandas.toFixed(4)}</Accordion.Header>
                <Accordion.Body>
                  <GistLoader gistId={codigosPandas[i][1]} />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </td>
          <td>
            <Accordion>
              <Accordion.Item eventKey={`convencional-${keyConvencional}`}>
                <Accordion.Header>
                  {valueConvencional.toFixed(4)}
                </Accordion.Header>
                <Accordion.Body>
                  <GistLoader gistId={codigosConvencional[i][1]} />
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
