import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import MenuItem from "./MenuItem/MenuItem";

import styles from "./AvailableMenu.module.css";

const AvailableMenu = () => {
  const [menu, setMenu] = useState([]);
  const [hasError, setHasError] = useState();

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch(
        "https://grab-your-coffee-default-rtdb.firebaseio.com/menu.json"
      );
      if (!response.ok) {
        throw new Error("데이터를 불러올 수 없습니다.");
      }

      const responseData = await response.json();

      let menuData = [];

      for (const key in responseData) {
        menuData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMenu(menuData);
    };

    fetchMenu().catch((error) => {
      setHasError(error.message);
    });
  }, []);

  if (hasError) {
    return (
      <section className={styles.MenuError}>
        <p>{hasError}</p>
      </section>
    );
  }

  const menuList = menu.map((item) => (
    <MenuItem
      id={item.id}
      key={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
    />
  ));

  return (
    <section className={styles.menu}>
      <Card>
        <ul>{menuList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMenu;
