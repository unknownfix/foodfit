import React, { useRef, useEffect } from "react";
import StyledModal from "./StyledModal";

interface Props {
  setIsOpen: (state: boolean) => void;
  header: string;
}

const Modal: React.FC<Props> = ({ children, setIsOpen, header }) => {
  const modalRef = useRef<HTMLDivElement>();

  const handleClickOutside = (event: MouseEvent): void => {
    if (modalRef && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <StyledModal>
      <div className="content" ref={modalRef}>
        <div className="header">
          <span className="close" onClick={() => setIsOpen(false)}>
            &#x2715;
          </span>
          <h2>{header}</h2>
        </div>
        <div className="body">{children}</div>
      </div>
    </StyledModal>
  );
};

export default Modal;
