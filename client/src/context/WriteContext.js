import { createContext, useContext, useReducer } from "react";

const WriteStateContext = createContext();
const WriteDispatchContext = createContext();
export const useWriteStateContext = () => useContext(WriteStateContext);
export const useWriteDispatchContext = () => useContext(WriteDispatchContext);

const initialState = {
  title: "",
  content: "",
  tags: [],
  post: null,
  postError: null,
};

const writeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_FIELD":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "INITIALIZE":
      return {
        ...state,
        initialState,
      };
    case "WRITE_POST":
      return {
        ...state,
        post: null,
        postError: null,
      };
    case "WRITE_POST_SUCCESS":
      return {
        ...state,
        post: action.post,
      };
    case "WRITE_POST_FAILURE":
      return {
        ...state,
        postError: action.postError,
      };
    default:
      throw new Error(`invalid action type : ${action.type}`);
  }
};

const WriteContextProvider = ({ children }) => {
  const [writeState, writeDispatch] = useReducer(writeReducer, initialState);

  return (
    <WriteStateContext.Provider value={writeState}>
      <WriteDispatchContext.Provider value={writeDispatch}>
        {children}
      </WriteDispatchContext.Provider>
    </WriteStateContext.Provider>
  );
};

export default WriteContextProvider;
