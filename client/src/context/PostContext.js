import { createContext, useContext, useReducer } from "react";

const PostStateContext = createContext();
const PostDispatchContext = createContext();
export const usePostStateContext = () => useContext(PostStateContext);
export const usePostDispatchContext = () => useContext(PostDispatchContext);

const initialState = {
  post: null,
  error: null,
  loading: false,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case "READ_POST":
      return {
        ...state,
        loading: true,
      };
    case "READ_POST_SUCCESS":
      return {
        ...state,
        post: action.post,
        loading: false,
      };
    case "READ_POST_FAILURE":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case "UNLOAD_POST":
      return {
        ...initialState,
      };
    default:
      throw new Error(`invalid action type : ${action.type} `);
  }
};

const PostContextProvider = ({ children }) => {
  const [postState, postDispatch] = useReducer(postReducer, initialState);

  return (
    <PostStateContext.Provider value={postState}>
      <PostDispatchContext.Provider value={postDispatch}>
        {children}
      </PostDispatchContext.Provider>
    </PostStateContext.Provider>
  );
};

export default PostContextProvider;
