import Head from "next/head";
import Link from "next/link";
import CustomButton from "../components/CustomButton";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="portafolio" />
        <title>Portafolio</title>
      </Head>
      <main>
        <h1>Bienvenido</h1>
        <p className="lead">
          Bienvenido a mi página web de portafolio. Aquí podrás explorar mi
          trabajo en el desarrollo de herramientas para simplificar el trabajo
          de las personas. Me especializo en la creación de aplicaciones con
          flutter y desarrollo web, y próximamente en el campo de la blockchain.
        </p>
        <p className="lead">
          <Link href="/proyectos" passHref>
            <CustomButton>Proyectos</CustomButton>
          </Link>
        </p>
      </main>
    </>
  );
}
