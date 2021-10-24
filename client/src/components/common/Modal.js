import Button from "./Button";
import styled from "styled-components";

const Fullscreen = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 320px;
  background: #fff;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  font-family: "Space Mono", monospace;
  p {
    margin-top: 1.3rem;
    margin-bottom: 1.3rem;
    color: #000;
    font-size: 1.1rem;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .buttons {
    display: flex;
    justify-content: space-evenly;
  }
`;

const Modal = ({
  visible,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  if (!visible) return null;
  return (
    <Fullscreen>
      <ModalWrapper>
        <p>{description}</p>
        <div className="buttons">
          {onConfirm ? (
            <>
              <Button onClick={onConfirm}>{confirmText}</Button>
              <Button onClick={onCancel}>{cancelText}</Button>
            </>
          ) : (
            <Button onClick={onCancel}>{cancelText}</Button>
          )}
        </div>
      </ModalWrapper>
    </Fullscreen>
  );
};

export default Modal;
