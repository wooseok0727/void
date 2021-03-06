import styled from "styled-components";
import Button from "../common/Button";
import { withRouter } from "react-router";
import {
  useWriteDispatchContext,
  useWriteStateContext,
} from "../../context/WriteContext";
import { useEffect } from "react";
import { writePostAPI, updatePostAPI } from "../../modules/posts";

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

  const { title, content, tags, post, postError, originalPostId } = writeState;

  const onPublish = () => {
    if (originalPostId) {
      updatePostAPI(writeDispatch, {
        id: originalPostId,
        title,
        content,
        tags,
      });
      return;
    }
    writePostAPI(writeDispatch, { title, content, tags });
  };

  const onCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      history.replace(`/@${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);

  return (
    <WriteActionButtonsWrapper>
      <Button onClick={onPublish}>
        {!!originalPostId ? "MODIFY" : "POST ADD"}
      </Button>
      <Button onClick={onCancel}>CANCEL</Button>
    </WriteActionButtonsWrapper>
  );
};

export default withRouter(WriteActionButtons);
