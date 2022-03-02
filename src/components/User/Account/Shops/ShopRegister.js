import React, { useRef, useContext } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../../../../store/auth-context";

import InputLarge from "../../../UI/InputLarge";
import AccountHeader from "../AccountHeader";
import Button from "../../../UI/Button";

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
        navigate("../");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles["article-container"]}>
      <AccountHeader headerText="카페 등록"></AccountHeader>
      <form onSubmit={registerHandler} className={styles.form}>
        <InputLarge
          ref={nameInput}
          label="카페 이름"
          input={{
            id: "name",
            type: "text",
          }}
        />
        <InputLarge
          ref={descriptionInput}
          label="카페 설명"
          input={{
            id: "description",
            type: "text",
          }}
        />
        <div>
          <h3>테이블, 주차장 유무</h3>
          <input
            type="checkbox"
            id="hasTables"
            name="hasTables"
            ref={hasTablesInput}
          />
          <label htmlFor="hasTables">
            <span>테이블</span>
          </label>
          <input
            type="checkbox"
            id="hasParkingLot"
            name="hasParkingLot"
            ref={hasParkingLotInput}
          />
          <label htmlFor="hasParkingLot">
            <span>주차장</span>
          </label>
        </div>
        <div>
          <h3>카페 이미지</h3>
          <input type="file" name="image" ref={fileInput} />
        </div>
        <div className={styles["btn-container"]}>
          <Button className="cancel">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("../");
              }}
            >
              취소
            </button>
          </Button>
          <Button>
            <button>등록</button>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShopRegister;
