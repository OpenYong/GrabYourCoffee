import React from "react";

import styles from "./AccountHeader.module.css";

const AccountHeader = (props) => {
  return (
    <div className={styles["article-header"]}>
      <h1>{props.headerText}</h1>
      {props.children}
    </div>
  );
};

export default AccountHeader;
