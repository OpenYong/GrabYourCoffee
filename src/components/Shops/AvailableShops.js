import React, { useEffect, useState } from "react";

import Shop from "./Shop";

import styles from "./AvailableShops.module.css";

const AvailableShops = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShopLists = async () => {
      const response = await fetch("http://localhost:8080/shop/lists");

      const responseData = await response.json();

      let shopsData = [];

      for (const key in responseData) {
        shopsData.push({
          id: responseData[key]._id,
          shopName: responseData[key].shopName,
          description: responseData[key].description,
          hasParkingLot: responseData[key].hasParkingLot,
          hasTables: responseData[key].hasTables,
          imageUrl: `http://localhost:8080/${responseData[key].imageUrl}`,
        });
      }
      setShops(shopsData);
    };
    fetchShopLists();
  }, []);

  const shopLists = shops.map((shop) => <Shop key={shop.id} shopData={shop} />);

  return <div className={styles["shops-container"]}>{shopLists}</div>;
};

export default AvailableShops;
