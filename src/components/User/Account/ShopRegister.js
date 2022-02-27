import React, { useRef, useContext } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../../../store/auth-context";

import styles from "./ShopRegister.module.css";

const ShopRegister = () => {
  const navigate = useNavigate();
  const nameInput = useRef();
  const descriptionInput = useRef();
  const hasTablesInput = useRef();
  const hasParkingLotInput = useRef();
  const fileInput = useRef();

  const authCtx = useContext(AuthContext);

  const token = authCtx.token;

  const registerHandler = async (e) => {
    e.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredDescription = descriptionInput.current.value;
    const enteredTableOption = hasTablesInput.current.checked;
    const enteredParkingOption = hasParkingLotInput.current.checked;
    const pickedImage = fileInput.current.files;

    const formData = new FormData();
    formData.append("name", enteredName);
    formData.append("description", enteredDescription);
    formData.append("hasTables", enteredTableOption);
    formData.append("hasParkingLot", enteredParkingOption);
    formData.append("image", pickedImage[0]);

    console.log(formData);

    await fetch("http://localhost:8080/shop/register", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("카페 등록 실패");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        navigate("../shops");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={registerHandler} className={styles.form}>
        <input name="name" placeholder="카페 이름" ref={nameInput} />
        <br />
        <input
          name="description"
          placeholder="카페 설명"
          ref={descriptionInput}
        />
        <br />
        <p>테이블, 주차장 유무를 선택해주세요:</p>
        <input
          type="checkbox"
          id="hasTables"
          name="hasTables"
          ref={hasTablesInput}
        />
        <label htmlFor="scales">테이블</label>
        <input
          type="checkbox"
          id="hasParkingLot"
          name="hasParkingLot"
          ref={hasParkingLotInput}
        />
        <label htmlFor="scales">주차장</label>
        <br />
        <input type="file" name="image" ref={fileInput} />
        <br />
        <button>등록</button>
      </form>
    </div>
  );
};

export default ShopRegister;
