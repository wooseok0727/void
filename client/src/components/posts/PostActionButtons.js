import styled from "styled-components";
import Button from "../common/Button";

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

const PostActionButtons = () => {
  return (
    <PostActionButtonsWrapper>
      <Button>MODIFY</Button>
      <Button>DELETE</Button>
    </PostActionButtonsWrapper>
  );
};

export default PostActionButtons;
