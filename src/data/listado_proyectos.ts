import intercaladoLogo from "../assets/logos/intercalado/logo_intercalado.svg";
import potplotLogo from "../assets/logos/potplot/potplot.svg";
import bcaaLogo from "../assets/logos/bcaa/logo_bcaa.svg";
import puenteLogo from "../assets/logos/puente/logo_puente.svg";
import calendario from "../assets/images/calendario.png";
import huerto from "../assets/images/huerto.jpeg";
import bcaa from "../assets/images/bcaa.jpeg";
import { StaticImageData } from "next/image";

interface Project {
  id: string;
  image: StaticImageData;
  title: string;
  description: string;
}

const projectsLogo: Project[] = [
  {
    id: "pdfIntercalator",
    image: intercaladoLogo,
    title: "Intercalador de paginas",
    description: "",
  },
  {
    id: "potPlot",
    image: potplotLogo,
    title: "PotPlot",
    description: "",
  },
  {
    id: "bcaaCalculator",
    image: bcaaLogo,
    title: "BCAA Calculator",
    description: "",
  },
  {
    id: "efficientEscape",
    image: puenteLogo,
    title: "Efficient Escape",
    description: "",
  },
];

const projectsContent: Project[] = [
  {
    id: "potPlot",
    title: "PotPlot",
    description:
      "¡Transforma tu espacio verde en una obra maestra!, lleva tu huerto al siguiente nivel: gestiona, planifica y visualiza tus parcelas de manera óptima.",
    image: huerto,
  },
  {
    id: "bcaaCalculator",
    title: "BCAA Calculator",
    description:
      "Toma el control de tus nutrientes. ¡Descubre y equilibra tu ingesta de BCAA con cada bocado!",
    image: bcaa,
  },
  {
    id: "efficientEscape",
    title: "EfficientEscape",
    description:
      "Optimiza tus días libres, planea tus escapadas. ¡Descubre la forma más inteligente de disfrutar tus vacaciones!",
    image: calendario,
  },
];

export { projectsLogo, projectsContent };
