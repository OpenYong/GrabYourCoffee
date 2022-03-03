import React from "react";

import { Link } from "react-router-dom";

import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <nav>
      <div className={styles["main-container"]}>
        <ul className={styles["nav-list"]}>
          <li>
            <Link to="/shops">음료</Link>
          </li>
          <li>원두</li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
