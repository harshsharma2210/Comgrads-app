import React, { useState } from "react";
import Modal from "react-modal";
import Info from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import "./Modal.css";
import CloseIcon from "@material-ui/icons/Close";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Modalbox = ({
  person: {
    user,
    email,
    name,
    level,
    price,
    description,
    duration,
    category,
    certification,
    language,
  },
}) => {
  console.log(user);
  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    console.log("Modal is open");
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log("Modal is Opened");
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    console.log("Modal is open");
    setIsOpen(false);
  }

  return (
    <div>
      <IconButton
        className="swipeButtons__repeat"
        id="modal__button"
        onClick={openModal}
      >
        <Info fontSize="large" />
      </IconButton>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <IconButton onClick={closeModal}>
          <CloseIcon />
        </IconButton>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Title: {name}</h2>
        <h4>Creator: {user ? user : "Not Available"}</h4>
        <h4>Price: {price}</h4>
        <h4>Level: {level}</h4>
        <h4>Category: {category}</h4>
        <h4>Duration: {duration}</h4>
        <h4>Cerificate: {certification === "TRUE" ? "Yes" : "No"}</h4>
        <h4>Language: {language}</h4>
        <h4>Description: {description}</h4>
        <h4>Email: {email ? email : "Not Available"}</h4>
      </Modal>
    </div>
  );
};
export default Modalbox;
