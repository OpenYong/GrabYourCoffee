import React from "react";

import Card from "../UI/Card";
import MenuItem from "./MenuItem/MenuItem";

import styles from "./AvailableMenu.module.css";
const DUMMY_MENU = [
  {
    id: "m1",
    name: "아메리카노",
    description: "에스프레소에 물타기",
    price: 2500,
  },
  {
    id: "m2",
    name: "카페라떼",
    description: "따뜻한 우유를 섞은",
    price: 4000,
  },
  {
    id: "m3",
    name: "카푸치노",
    description: "라떼보다 거품이 더 많은...",
    price: 4000,
  },
  {
    id: "m4",
    name: "모카라떼",
    description: "라떼에 초콜릿을...",
    price: 4000,
  },
];

const AvailableMenu = () => {
  const menuList = DUMMY_MENU.map((item) => (
    <MenuItem
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
