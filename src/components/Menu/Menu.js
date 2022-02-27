import React from "react";

import AvailableMenu from "./AvailableMenu";
import { Fragment } from "react/cjs/react.production.min";

const Menu = (props) => {
  const shopId = props.shopId;
  return (
    <Fragment>
      <AvailableMenu shopId={shopId} />
    </Fragment>
  );
};

export default Menu;
