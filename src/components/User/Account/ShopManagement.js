import React, { useRef, useContext, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import AuthContext from "../../../store/auth-context";

import styles from "./ShopManagement.module.css";

import useHttp from "../../../hooks/use-http";

import Modal from "../../UI/Modal";

import MenuRegister from "./MenuRegister";

const ShopManagement = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sendRequest, error } = useHttp();
  const shopData = location.state;

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const descriptionInput = useRef();
  const hasTablesInput = useRef();
  const hasParkingLotInput = useRef();
  const fileInput = useRef();

  const [showMenuRegister, setShowMenuRegister] = useState(false);

  const updateHandler = async (e) => {
    e.preventDefault();

    // const enteredName = nameInput.current.value;
    const enteredDescription = descriptionInput.current.value;
    const enteredTableOption = hasTablesInput.current.checked;
    const enteredParkingOption = hasParkingLotInput.current.checked;
    const pickedImage = fileInput.current.files;

    const formData = new FormData();
    formData.append("name", shopData.shopName);
    formData.append("description", enteredDescription);
    formData.append("hasTables", enteredTableOption);
    formData.append("hasParkingLot", enteredParkingOption);
    formData.append("image", pickedImage[0]);

    await fetch(`http://localhost:8080/shop/list/${shopData.id}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("데이터 수정 실패");
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

  const deleteHandler = () => {
    const result = window.confirm("정말 삭제 하시곘습니까?");
    if (result) {
      fetch(`http://localhost:8080/shop/list/${shopData.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("데이터 삭제 실패");
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
    }
  };

  const showModalHandler = () => {
    setShowMenuRegister(true);
  };

  const hideModalHandler = () => {
    setShowMenuRegister(false);
  };

  return (
    <div className={styles.main}>
      {showMenuRegister && (
        <MenuRegister onClose={hideModalHandler} token={token} />
      )}
      <h2>{shopData.shopName} </h2>
      <form onSubmit={updateHandler} className={styles.form}>
        <input
          name="description"
          placeholder="카페 설명"
          ref={descriptionInput}
        />
        <br />
        <p>테이블, 주차장 유무:</p>
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
        <button>업데이트</button>
      </form>
      <button onClick={deleteHandler}>등록된 카페 삭제</button>
      <div>
        <button onClick={showModalHandler}>메뉴 등록</button>
      </div>
    </div>
  );
};

export default ShopManagement;
