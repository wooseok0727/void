import PostViewer from "./posts/PostViewer";
import { withRouter } from "react-router-dom";
import {
  usePostDispatchContext,
  usePostStateContext,
} from "../context/PostContext";
import { useEffect } from "react";
import { readPostAPI, removePostAPI } from "../modules/posts";
import PostActionButtons from "./posts/PostActionButtons";
import { useUserStateContext } from "../context/UserContext";
import { useWriteDispatchContext } from "../context/WriteContext";

const Post = ({ match, history }) => {
  const { postId } = match.params;
  const postState = usePostStateContext();
  const postDispatch = usePostDispatchContext();
  const userState = useUserStateContext();
  const writeDispatch = useWriteDispatchContext();

  const { post, error, loading } = postState;
  const { user } = userState;

  useEffect(() => {
    readPostAPI(postDispatch, postId);
    return () => {
      postDispatch({ type: "UNLOAD_POST" });
    };
  }, [postDispatch, postId]);

  const onEdit = () => {
    writeDispatch({ type: "SET_ORIGINAL_POST", post: post });
    history.push("/write");
  };

  const onRemove = async () => {
    try {
      await removePostAPI(postId);
      history.replace("/");
    } catch (e) {
      console.log(e);
    }
  };

  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={
        ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
};

export default withRouter(Post);
