import React from "react";

import Card from "../../../UI/Card";
import Button from "../../../UI/Button";

import styles from "./Menu.module.css";

const Menu = (props) => {
  const menuData = props.menuData;

  const menuList = menuData.map((item) => (
    <li>
      <div className={styles["item-container"]}>
        <div className={styles["item-img"]}>
          <img src={`http://localhost:8080/${item.imageUrl}`} />
        </div>
        <div className={styles["item-info"]}>
          <h3>{item.name}</h3>
          <div className={styles["samll-text"]}>{item.description}</div>
        </div>
        <div className={styles["item-price"]}>
          <h3>가격</h3>
          <div className={styles["samll-text"]}>{item.price}원</div>
        </div>
        <div>
          <Button>
            <button
              onClick={() => {
                props.onDelete(item._id);
              }}
            >
              삭제
            </button>
          </Button>
        </div>
      </div>
    </li>
  ));

  return (
    <div className={styles["main-container"]}>
      <Card>
        <h1>메뉴</h1>
        <ul>{menuList}</ul>
      </Card>
    </div>
  );
};

export default Menu;
