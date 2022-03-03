import React, { useRef } from "react";
import { Link } from "react-router-dom";

import InputLarge from "../UI/InputLarge";
import LoginSignupUI from "../UI/LoginSignupUI";

import styles from "../UI/LoginSignupUI.module.css";

const Signup = () => {
  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const signupHandler = async (e) => {
    e.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;

    await fetch("http://localhost:8080/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("유효성 검사 실패.");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <LoginSignupUI>
      <div className={styles.sidebar}>
        <div className={styles["sidebar-container"]}>
          <h1>회원가입을 해봅시다!</h1>
          <h2>
            이미 계정이 있으신가요? <Link to="/user/login">로그인하기</Link>
          </h2>
        </div>
      </div>
      <div className={styles.article}>
        <form onSubmit={signupHandler}>
          <InputLarge
            ref={nameInput}
            label="이름"
            input={{
              id: "name",
              type: "text",
            }}
          />
          <InputLarge
            ref={emailInput}
            label="E-mail"
            input={{
              id: "email",
              type: "text",
            }}
          />
          <InputLarge
            ref={passwordInput}
            label="Password"
            input={{
              id: "password",
              type: "Password",
              min: "3",
            }}
          />
          <button className={styles.btn}>확인</button>
        </form>
      </div>
    </LoginSignupUI>
  );
};

export default Signup;
