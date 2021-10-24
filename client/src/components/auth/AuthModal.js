import Modal from "../common/Modal";

const AuthModal = ({ visible, onCancel, description }) => {
  return (
    <Modal
      visible={visible}
      description={description}
      onCancel={onCancel}
      cancelText="OK"
    />
  );
};

export default AuthModal;
