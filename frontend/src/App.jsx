import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import { HelmetProvider } from "react-helmet-async";
import MyHelmet from "./utils/helmet";

function App() {

  return (
    <HelmetProvider>
      <MyHelmet />
      <main className="container">
        <Header />
        <Section />
      </main>
      <Footer />
    </HelmetProvider>
  );
}

export default App;
