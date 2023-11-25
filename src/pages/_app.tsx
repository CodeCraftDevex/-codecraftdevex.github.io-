import { AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "react-bootstrap/Container";
import FollowerComponent from "../components/Follower";
import PageTransition from "../components/PageTransition";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <FollowerComponent />
      {/* <Header /> */}
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
    </>
  );
}

export default MyApp;
