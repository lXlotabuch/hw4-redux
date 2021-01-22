import { React, useState, useEffect } from "react";
import CardsPlace from "./components/CardsPlace";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import store from "./state";
import { Provider } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='App'>
          <Header />
          <CardsPlace />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
