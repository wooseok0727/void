import { createContext, useContext, useReducer } from "react";

const PostsStateContext = createContext();
const PostsDispatchContext = createContext();
export const usePostsStateContext = () => useContext(PostsStateContext);
export const usePostsDispatchContext = () => useContext(PostsDispatchContext);

const initialState = {
  posts: null,
  error: null,
  loading: false,
  lastPage: 1,
};

const postsReducer = (state, action) => {
  switch (action.type) {
    case "LIST_POST":
      return {
        ...state,
        loading: true,
      };
    case "LIST_POST_SUCCESS":
      return {
        ...state,
        posts: action.posts,
        loading: false,
        lastPage: parseInt(action.meta.headers["last-page"], 10),
      };
    case "LIST_POST_FAILURE":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      throw new Error(`invalid action type : ${action.type} `);
  }
};

const PostsContextProvider = ({ children }) => {
  const [postsState, postsDispatch] = useReducer(postsReducer, initialState);

  return (
    <PostsStateContext.Provider value={postsState}>
      <PostsDispatchContext.Provider value={postsDispatch}>
        {children}
      </PostsDispatchContext.Provider>
    </PostsStateContext.Provider>
  );
};

export default PostsContextProvider;
