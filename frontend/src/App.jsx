import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import MyHelmet from "./utils/helmet";

function App() {
  return (
    <>
    <MyHelmet />
      <main className="container">
        <Header />
        <Section />
      </main>
      <Footer />
    </>
  );
}

export default App;
