import React, { Fragment } from "react";

import coffeeImage from "../../assets/coffee-bar.jpg";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Grab Your Coffee</h1>
        <button>장바구니</button>
      </header>
      <div className={styles["main-image"]}>
        <img src={coffeeImage} alt="커피바 사진" />
      </div>
    </Fragment>
  );
};

export default Header;
