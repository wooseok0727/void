import React from "react";
import Modal from "../common/Modal";

const PostModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      visible={visible}
      description="Are you sure delete?"
      confirmText="DELETE"
      cancelText="CANCEL"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default PostModal;
