import React from "react";

import Banner from "../components/Layout/Banner";
import Shops from "../components/Shops/Shops";
import Footer from "../components/Layout/Footer";

const MainPage = () => {
  return (
    <React.Fragment>
      <Banner />
      <Shops />
    </React.Fragment>
  );
};

export default MainPage;
