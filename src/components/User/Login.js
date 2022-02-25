import React, { useRef, useContext } from "react";

import AuthContext from "../../store/auth-context";

import { Link } from "react-router-dom";

const Login = () => {
  const emailInput = useRef();
  const passwordInput = useRef();

  const authCtx = useContext(AuthContext);

  const loginHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;

    await fetch("http://localhost:8080/auth/login", {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <span>안녕하세요 :) 로그인 해주세요.</span>
        <span>
          처음 오셨나요? <Link to="/user/register">회원 가입 하기</Link>
        </span>
      </div>
      <div>
        <form onSubmit={loginHandler}>
          <input name="email" placeholder="이메일" ref={emailInput} />
          <br />
          <input name="password" placeholder="비밀번호" ref={passwordInput} />
          <br />
          <button>로그인</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
