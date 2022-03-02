import React, { useRef } from "react";
import { useParams } from "react-router-dom";

import Modal from "../../../UI/Modal";

import useHttp from "../../../../hooks/use-http";

const MenuRegister = (props) => {
  const { token } = props;
  const { sendRequest, error, isLoading } = useHttp();

  const params = useParams();
  const shopId = params.shopId;

  const nameInput = useRef();
  const priceInput = useRef();
  const descriptionInput = useRef();
  const fileInput = useRef();

  const registerMenuHandler = (e) => {
    e.preventDefault();
    const pickedImage = fileInput.current.files;
    const enteredName = nameInput.current.value;
    const enteredDescription = descriptionInput.current.value;
    const enteredPrice = priceInput.current.value;

    const formData = new FormData();
    formData.append("name", enteredName);
    formData.append("description", enteredDescription);
    formData.append("price", enteredPrice);
    formData.append("image", pickedImage[0]);

    sendRequest(
      {
        url: `http://localhost:8080/shop/menu/${shopId}`,
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      (data) => {
        console.log(data);
      }
    );
    if (!isLoading) {
      props.onClose();
    }
  };

  return (
    <Modal>
      <React.Fragment>
        <form onSubmit={registerMenuHandler}>
          <label>메뉴명</label>
          <input id="name" name="name" ref={nameInput} />
          <br />
          <label>가격</label>
          <input id="price" name="price" ref={priceInput} />
          <br />
          <label>설명</label>
          <input id="description" name="description" ref={descriptionInput} />
          <input type="file" name="image" ref={fileInput} />
          <button>등록</button>
        </form>
        <div>
          <button onClick={props.onClose}>닫기</button>
        </div>
      </React.Fragment>
    </Modal>
  );
};

export default MenuRegister;
