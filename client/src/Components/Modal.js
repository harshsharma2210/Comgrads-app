import React, { useState } from "react";
import Modal from "react-modal";
import Info from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";

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
        <button onClick={closeModal}>close</button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{name}</h2>
        <h4>{user}</h4>
        <h4>{price}</h4>
        <h4>{level}</h4>
        <h4>{category}</h4>
        <h4>{duration}</h4>
        <h4>{certification}</h4>
        <h4>{language}</h4>
        <h4>{description}</h4>
      </Modal>
    </div>
  );
};
export default Modalbox;
