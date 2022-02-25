import React, { useRef, useState } from "react";
import styles from "./Shops.module.css";

import Modal from "../../UI/Modal";

const Shops = () => {
  const [showRegister, setShowRegister] = useState(false);

  const nameInput = useRef();
  const descriptionInput = useRef();
  const hasTablesInput = useRef();
  const hasParkingLotInput = useRef();

  const clickRegisterHandler = () => {
    setShowRegister(true);
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredDescription = descriptionInput.current.value;
    const enteredTableOption = hasTablesInput.current.checked;
    const enteredParkingOption = hasParkingLotInput.current.checked;

    await fetch("http://localhost:8080/shop/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: enteredName,
        description: enteredDescription,
        hasTables: enteredTableOption,
        hasParkingLot: enteredParkingOption,
      }),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("카페 등록 실패");
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

  const modalContent = (
    <React.Fragment>
      <h1>카페 등록</h1>
      <div>
        <form>
          <div>
            <label htmlFor="name">카페 이름</label>
            <input type="text" id="name" ref={nameInput} />
          </div>
          <div>
            <label htmlFor="description">설명</label>
            <input type="textarea" id="description" ref={descriptionInput} />
          </div>
          <div>
            <input
              type="checkbox"
              id="hasTables"
              name="hasTables"
              ref={hasTablesInput}
            />
            <label htmlFor="hasTables">테이블</label>
            <input
              type="checkbox"
              id="hasParkingLot"
              name="hasParkingLot"
              ref={hasParkingLotInput}
            />
            <label htmlFor="name">주차장</label>
          </div>
          <button onClick={registerHandler}>등록</button>
        </form>
      </div>
    </React.Fragment>
  );

  return (
    <div className={styles["shops-container"]}>
      {showRegister && <Modal>{modalContent}</Modal>}
      <h1>카페 관리</h1>
      <div>
        <button onClick={clickRegisterHandler}>등록</button>
      </div>
      <div>리스트</div>
    </div>
  );
};

export default Shops;
