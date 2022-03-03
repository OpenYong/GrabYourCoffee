import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import MenuItem from "./MenuItem/MenuItem";

import useHttp from "../../hooks/use-http";

import styles from "./AvailableMenu.module.css";

const AvailableMenu = (props) => {
  const [menu, setMenu] = useState([]);
  const shopId = props.shopId;

  const { sendRequest, error } = useHttp();

  useEffect(() => {
    const setDataFunc = (objData) => {
      const menu = objData.menu;
      let arrayData = [];
      for (const key in menu) {
        arrayData.push(menu[key]);
      }
      setMenu(arrayData);
    };

    sendRequest(
      {
        url: `http://localhost:8080/shop/menu/${shopId}`,
      },
      setDataFunc
    );
  }, []);

  if (error) {
    return (
      <section className={styles.MenuError}>
        <p>{error}</p>
      </section>
    );
  }

  const menuList = menu.map((item) => (
    <MenuItem
      key={item._id}
      id={item._id}
      name={item.name}
      description={item.description}
      price={item.price}
      shopId={shopId}
      imageUrl={item.imageUrl}
    />
  ));

  return (
    <div className={styles.menu}>
      <Card>
        <h1>메뉴</h1>
        <ul>{menuList}</ul>
      </Card>
    </div>
  );
};

export default AvailableMenu;
