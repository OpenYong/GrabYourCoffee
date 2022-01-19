import React, { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import coffeeImage from "../../assets/coffee-bar.jpg";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Grab Your Coffee</h1>
        <HeaderCartButton />
      </header>
      <div className={styles["main-image"]}>
        <img src={coffeeImage} alt="커피바 사진" />
      </div>
    </Fragment>
  );
};

export default Header;
