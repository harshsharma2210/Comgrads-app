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

const Modalbox = () => {
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
      <IconButton className="swipeButtons__repeat" id="modal__button" onClick={openModal}>
        <Info fontSize="large" />
      </IconButton>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
};
export default Modalbox;
