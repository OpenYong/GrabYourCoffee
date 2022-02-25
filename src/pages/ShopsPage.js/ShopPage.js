import React from "react";

import { useParams } from "react-router-dom";

const ShopPage = () => {
  const params = useParams();

  console.log(params.shopId);

  return (
    <div>
      <h1>asdassadasd</h1>
    </div>
  );
};

export default ShopPage;
