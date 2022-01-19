import React from "react";

import MenuSummary from "./MenuSummary";
import AvailableMenu from "./AvailableMenu";
import { Fragment } from "react/cjs/react.production.min";

const Menu = () => {
  return (
    <Fragment>
      <MenuSummary />
      <AvailableMenu />
    </Fragment>
  );
};

export default Menu;
