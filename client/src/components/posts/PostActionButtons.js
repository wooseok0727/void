import { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import PostModal from "./PostModal";

const PostActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
  div {
    margin-top: 0;
    width: 6rem;
  }
  div + div {
    margin-left: 0.5rem;
  }
`;

const PostActionButtons = ({ onEdit, onRemove }) => {
  const [modal, setModal] = useState(false);

  const onRemoveClick = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };

  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  return (
    <>
      <PostActionButtonsWrapper>
        <Button onClick={onEdit}>MODIFY</Button>
        <Button onClick={onRemoveClick}>DELETE</Button>
      </PostActionButtonsWrapper>
      <PostModal visible={modal} onConfirm={onConfirm} onCancel={onCancel} />
    </>
  );
};

export default PostActionButtons;
