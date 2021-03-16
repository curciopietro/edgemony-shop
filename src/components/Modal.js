import { PropTypes } from "prop-types";
import "./Modal.css";

function Modal({ closeModal, isOpen, children }) {
  return (
    <div className={`modal ${isOpen ? `isOpen` : ""}`}>
      <div className="overlay" onClick={closeModal} />
      <div className="body">
        <button onClick={closeModal} title="close modal" className="close">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Modal;
