import React from "react";

import Input from "../../UI/Input";
import styles from "./MenuItemForm.module.css";

const MenuItemForm = (props) => {
  return (
    <form className={styles.form}>
      <Input
        label="수량"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "10",
          defaultValue: "1",
        }}
      />
      <button>+ 담기</button>
    </form>
  );
};

export default MenuItemForm;
