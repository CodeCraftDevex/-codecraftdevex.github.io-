import { AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import FollowerComponent from "../components/Follower";
import "bootstrap/dist/css/bootstrap.min.css";

import { AppProps } from "next/app";
import "@/styles/globals.scss";
import { Container } from "react-bootstrap";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <div className="d-flex w-100 h-100 p-3 mx-auto flex-column">
      <FollowerComponent />
      <Header />
      <main>
        <Container className="px-3">
          <AnimatePresence mode="wait">
            <PageTransition key={router.route}>
              <Component {...pageProps} />
            </PageTransition>
          </AnimatePresence>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
