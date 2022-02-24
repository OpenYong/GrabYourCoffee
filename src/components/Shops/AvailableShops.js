import React, { useEffect, useState } from "react";

import Shop from "./Shop";

const AvailableShops = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShopLists = async () => {
      const response = await fetch("http://localhost:8080/shop/lists");

      const responseData = await response.json();

      let shopsData = [];

      console.log(responseData);

      for (const key in responseData) {
        shopsData.push({
          id: key,
          shopName: responseData[key].shopName,
          description: responseData[key].description,
          hasParkingLot: responseData[key].hasParkingLot,
          hasTables: responseData[key].hasTables,
        });
      }
      setShops(shopsData);
    };
    fetchShopLists();
  }, []);

  const shopLists = shops.map(() => <Shop />);

  return (
    <div>
      <ul>{shopLists}</ul>
    </div>
  );
};

export default AvailableShops;
