import React, { useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import InputLarge from "../UI/InputLarge";
import LoginSignupUI from "../UI/LoginSignupUI";

import styles from "../UI/LoginSignupUI.module.css";

const Login = (props) => {
  const emailInput = useRef();
  const passwordInput = useRef();
  const Navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const loginHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("유효성 검사 실패.");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("로그인 실패");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        const expTime = new Date(
          new Date().getTime() + resData.expiresIn * 1000
        );
        authCtx.login(resData.token, expTime);
        Navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <LoginSignupUI>
      <div className={styles.sidebar}>
        <h1>안녕하세요 :) 로그인 해주세요.</h1>
        <h2>
          처음 오셨나요? <Link to="/user/register">회원 가입 하기</Link>
        </h2>
      </div>
      <div className={styles.article}>
        <form onSubmit={loginHandler} className={styles.form}>
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
          <div>
            <button className={styles.btn}>로그인</button>
          </div>
        </form>
      </div>
    </LoginSignupUI>
  );
};

export default Login;
