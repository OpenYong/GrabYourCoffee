import React, { useRef, useState } from "react";
import Button from "../UI/Button";

import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isElevenDigit = (value) => value.trim().length === 11;

const Checkout = (props) => {
  const [formInputValidation, setFormInputValidation] = useState({
    name: true,
    tel: true,
  });

  const requestInput = useRef();
  const telInput = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredRequest = requestInput.current.value;
    const enteredTel = telInput.current.value;

    const telisValid = !isEmpty(enteredTel) && isElevenDigit(enteredTel);

    setFormInputValidation({
      tel: telisValid,
    });

    const formIsValid = telisValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      request: enteredRequest,
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
        <label htmlFor="request">요청사항</label>
        <input type="textarea" id="request" ref={requestInput} />
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
        <Button className="cancel">
          <button type="button" onClick={props.onClose}>
            취소
          </button>
        </Button>
        <Button>
          <button className={styles.submit}>확인</button>
        </Button>
      </div>
    </form>
  );
};

export default Checkout;
