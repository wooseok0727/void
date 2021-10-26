import { createContext, useContext, useReducer } from "react";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();
export const useAuthStateContext = () => useContext(AuthStateContext);
export const useAuthDispatchContext = () => useContext(AuthDispatchContext);

const initialState = {
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
  },
  login: {
    username: "",
    password: "",
  },
  auth: null,
  authError: null,
  loading: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_FIELD":
      return {
        ...state,
        [action.form]: {
          ...state[action.form],
          [action.name]: action.value,
        },
      };
    case "INITIALIZE_FORM":
      return {
        ...state,
        [action.form]: { ...initialState[action.form] },
        authError: null,
      };
    case "REGISTER":
      return {
        ...state,
        loading: true,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        authError: null,
        auth: action.auth,
        loading: false,
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        authError: action.authError,
        loading: false,
      };
    case "LOGIN":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null,
        auth: action.auth,
        loading: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        authError: action.authError,
        loading: false,
      };
    default:
      throw new Error(`invalid action type : ${action.type} `);
  }
};

const AuthContextProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={authState}>
      <AuthDispatchContext.Provider value={authDispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export default AuthContextProvider;
