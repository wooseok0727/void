import styled from "styled-components";
import Button from "../common/Button";

const WriteActionButtonsWrapper = styled.div`
  margin-bottom: 3rem;
  div {
    margin-top: 0;
    width: 6rem;
  }
  div + div {
    margin-left: 0.5rem;
  }
`;

const WriteActionButtons = ({ onCancel, onPublish }) => {
  return (
    <WriteActionButtonsWrapper>
      <Button onClick={onPublish}>POST ADD</Button>
      <Button onClick={onCancel}>CANCEL</Button>
    </WriteActionButtonsWrapper>
  );
};

export default WriteActionButtons;
