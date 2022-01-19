import { Fragment } from "react";
import "./App.css";

import Header from "./components/Layout/Header";
import Menu from "./components/Menu/Menu";

function App() {
  return (
    <Fragment>
      <Header />
      <Menu />
    </Fragment>
  );
}

export default App;
