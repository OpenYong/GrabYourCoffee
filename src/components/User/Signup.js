import React, { useRef } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <div>
        <span>회원가입을 해봅시다!</span>
        <span>
          이미 계정이 있으신가요? <Link to="/user/login">로그인하기</Link>
        </span>
      </div>
      <div>
        <form onSubmit={signupHandler}>
          <input name="name" placeholder="이름" ref={nameInput} />
          <br />
          <input name="email" placeholder="이메일" ref={emailInput} />
          <br />
          <input name="password" placeholder="비밀번호" ref={passwordInput} />
          <br />
          <button>확인</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
