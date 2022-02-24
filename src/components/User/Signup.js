import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("aaaa");
  };

  return (
    <div>
      <div>
        <span>회원가입을 해봅시다!</span>
        <span>
          이미 계정이 있으신가요? <Link to="/login">로그인하기</Link>
        </span>
      </div>
      <div>
        <form onClick={submitHandler} method="POST">
          <input name="name" placeholder="이름" />
          <br />
          <input name="email" placeholder="이메일" />
          <br />
          <input name="password" placeholder="비밀번호" />
          <br />
          <input type="submit" value="전송" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
