import React from "react";

interface ModalProps {
  active: boolean;
}

const Modal: React.FC<ModalProps> = ({ active, children }) => {
  return (
    <div id="modal" className={`modal ${active && "modal-open"}`}>
      {children}
    </div>
  );
};

export default Modal;
