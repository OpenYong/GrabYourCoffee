import React, { useRef, useState } from "react";

import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isElevenDigit = (value) => value.trim().length === 11;

const Checkout = (props) => {
  const [formInputValidation, setFormInputValidation] = useState({
    name: true,
    tel: true,
  });

  const nameInput = useRef();
  const telInput = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredTel = telInput.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const telisValid = !isEmpty(enteredTel) && isElevenDigit(enteredTel);

    setFormInputValidation({
      name: nameIsValid,
      tel: telisValid,
    });

    const formIsValid = nameIsValid && telisValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      tel: enteredTel,
    });
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div
        className={`${styles.control}  ${
          formInputValidation.name ? "" : styles.invalid
        }`}
      >
        <label htmlFor="name">성함</label>
        <input type="text" id="name" ref={nameInput} />
        {!formInputValidation.name && <span>성함을 입력해주세요</span>}
      </div>
      <div
        className={`${styles.control}  ${
          formInputValidation.tel ? "" : styles.invalid
        }`}
      >
        <label htmlFor="tel">휴대전화</label>
        <input type="text" id="tel" ref={telInput} />
        {!formInputValidation.tel && (
          <span>전화번호 11자리를 입력해주세요</span>
        )}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onClose}>
          취소
        </button>
        <button className={styles.submit}>확인</button>
      </div>
    </form>
  );
};

export default Checkout;
