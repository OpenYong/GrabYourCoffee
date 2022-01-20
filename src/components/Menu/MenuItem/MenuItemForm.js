import React, { useRef } from "react";
import { useState } from "react/cjs/react.development";

import Input from "../../UI/Input";
import styles from "./MenuItemForm.module.css";

const MenuItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const numOfEnteredAmount = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      numOfEnteredAmount < 1 ||
      numOfEnteredAmount > 10
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(numOfEnteredAmount);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
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
      {!amountIsValid && <p>올바른 수량을 입력해주세요.</p>}
    </form>
  );
};

export default MenuItemForm;
