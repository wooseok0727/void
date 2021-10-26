import styled from "styled-components";
import Button from "../common/Button";
import { withRouter } from "react-router";
import {
  useWriteDispatchContext,
  useWriteStateContext,
} from "../../context/WriteContext";
import { useEffect } from "react";
import { writePostAPI } from "../../modules/posts";

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

const WriteActionButtons = ({ history }) => {
  const writeState = useWriteStateContext();
  const writeDispatch = useWriteDispatchContext();

  const { title, content, tags, post, postError } = writeState;

  const onPublish = () => {
    writePostAPI(writeDispatch, { title, content, tags });
  };

  const onCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      history.push(`/@${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);

  return (
    <WriteActionButtonsWrapper>
      <Button onClick={onPublish}>POST ADD</Button>
      <Button onClick={onCancel}>CANCEL</Button>
    </WriteActionButtonsWrapper>
  );
};

export default withRouter(WriteActionButtons);
