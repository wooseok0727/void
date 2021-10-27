import React, { useEffect } from "react";
import PostListViewer from "./posts/PostListViewer";
import qs from "qs";
import {
  usePostsDispatchContext,
  usePostsStateContext,
} from "../context/PostsContext";
import { useUserStateContext } from "../context/UserContext";
import { listPostsAPI } from "../modules/posts";
import { withRouter } from "react-router";
import Pagination from "./posts/Pagination";

const PostList = ({ location, match }) => {
  const postsState = usePostsStateContext();
  const postsDispatch = usePostsDispatchContext();
  const userState = useUserStateContext();

  const { posts, error, loading } = postsState;
  const { user } = userState;

  useEffect(() => {
    const { username } = match.params;
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    listPostsAPI(postsDispatch, { page, username, tag });
  }, [postsDispatch, location.search, match.params]);

  return (
    <>
      <PostListViewer
        loading={loading}
        error={error}
        posts={posts}
        showWriteButton={user}
      />
      <Pagination />
    </>
  );
};

export default withRouter(PostList);
