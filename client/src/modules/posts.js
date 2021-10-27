import client from "./client";
import qs from "qs";

export const writePostAPI = async (dispatch, { title, content, tags }) => {
  await dispatch({ type: "WRITE_POST" });
  try {
    const response = await client.post("/api/posts", { title, content, tags });
    dispatch({ type: "WRITE_POST_SUCCESS", post: response.data });
  } catch (e) {
    dispatch({ type: "WRITE_POST_FAILURE", postError: e });
  }
};

export const readPostAPI = async (dispatch, id) => {
  await dispatch({ type: "READ_POST" });
  try {
    const response = await client.get(`/api/posts/${id}`);
    dispatch({ type: "READ_POST_SUCCESS", post: response.data });
  } catch (e) {
    dispatch({ type: "READ_POST_FALIURE", error: e });
  }
};

export const listPostsAPI = async (dispatch, { page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });

  await dispatch({ type: "LIST_POST" });
  try {
    const response = await client.get(`/api/posts?${queryString}`);
    dispatch({
      type: "LIST_POST_SUCCESS",
      posts: response.data,
      meta: response,
    });
  } catch (e) {
    dispatch({ type: "LIST_POST_FALIURE", error: e });
  }
};

export const updatePostAPI = async (dispatch, { id, title, content, tags }) => {
  try {
    const response = await client.patch(`/api/posts/${id}`, {
      title,
      content,
      tags,
    });
    dispatch({ type: "UPDATE_POST_SUCCESS", post: response.data });
  } catch (e) {
    dispatch({ type: "UPDATE_POST_FAILURE", postError: e });
  }
};

export const removePostAPI = async (id) => {
  try {
    await client.delete(`/api/posts/${id}`);
  } catch (e) {
    console.log(e);
  }
};
