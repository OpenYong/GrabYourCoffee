import React, { useRef, useContext, useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import AuthContext from "../../../../store/auth-context";

import styles from "./ShopManagement.module.css";

import useHttp from "../../../../hooks/use-http";
import MenuRegister from "./MenuRegister";

import AccountHeader from "../AccountHeader";
import Menu from "./Menu";

const ShopManagement = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sendRequest } = useHttp();
  const shopData = location.state;
  const shopId = shopData.id;

  const [menu, setMenu] = useState([]);
  const [showMenuRegister, setShowMenuRegister] = useState(false);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const descriptionInput = useRef();
  const hasTablesInput = useRef();
  const hasParkingLotInput = useRef();
  const fileInput = useRef();

  useEffect(() => {
    const setDataFunc = (objData) => {
      const menu = objData.menu;
      let arrayData = [];
      for (const key in menu) {
        arrayData.push(menu[key]);
      }
      setMenu(arrayData);
    };

    sendRequest(
      {
        url: `http://localhost:8080/shop/menu/${shopId}`,
      },
      setDataFunc
    );
  }, [showMenuRegister]);

  console.log(menu);

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

  const menuDeleteHandler = async (menuId) => {
    const result = window.confirm("메뉴를 정말 삭제 하시곘습니까?");
    if (result) {
      const setResponse = (objData) => {
        console.log(objData);
      };
      sendRequest(
        {
          url: `http://localhost:8080/shop/menu/${menuId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        setResponse
      );
      // navigate("");
      await setMenu((prevMenu) =>
        prevMenu.filter((prevState) => prevState._id !== menuId)
      );
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
      <AccountHeader headerText="상세 보기">
        <div>수정하기</div>
      </AccountHeader>
      <div>
        <h3>카페 이름</h3>
        <div className={styles["samll-text"]}>{shopData.shopName}</div>
      </div>
      <div>
        <h3>카페 설명 </h3>
        <div className={styles["samll-text"]}>{shopData.description}</div>
      </div>
      <div>
        <Menu menuData={menu} onDelete={menuDeleteHandler} />
      </div>
      <button onClick={deleteHandler}>등록된 카페 삭제</button>
      <div>
        <button onClick={showModalHandler}>메뉴 등록</button>
      </div>
    </div>
  );
};

export default ShopManagement;
