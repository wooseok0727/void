import { createContext, useContext, useReducer } from "react";

const UserStateContext = createContext();
const UserDispatchContext = createContext();
export const useUserStateContext = () => useContext(UserStateContext);
export const useUserDispatchContext = () => useContext(UserDispatchContext);

const initialState = {
  user: null,
  checkError: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "TEMP_SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "CHECK_SUCCESS":
      return {
        ...state,
        user: action.user,
        checkError: null,
      };
    case "CHECK_FAILURE":
      return {
        ...state,
        user: null,
        checkError: action.checkError,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      throw new Error(`invalid action type : ${action.type} `);
  }
};

const UserContextProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, initialState);

  return (
    <UserStateContext.Provider value={userState}>
      <UserDispatchContext.Provider value={userDispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export default UserContextProvider;
