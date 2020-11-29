import React from "react";
import "./App.scss";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import Home from "./../Home/Home";

function App() {
  return (
    <div className="app">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
