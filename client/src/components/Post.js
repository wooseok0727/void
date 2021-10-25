import PostViewer from "./posts/PostViewer";
import { withRouter } from "react-router-dom";
import {
  usePostDispatchContext,
  usePostStateContext,
} from "../context/PostContext";
import { useEffect } from "react";
import { readPostAPI } from "../modules/posts";
import PostActionButtons from "./posts/PostActionButtons";

const Post = ({ match }) => {
  const { postId } = match.params;
  const postState = usePostStateContext();
  const postDispatch = usePostDispatchContext();

  const { post, error, loading } = postState;

  useEffect(() => {
    readPostAPI(postDispatch, postId);
    return () => {
      postDispatch({ type: "UNLOAD_POST" });
    };
  }, [postDispatch, postId]);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={<PostActionButtons />}
    />
  );
};

export default withRouter(Post);
