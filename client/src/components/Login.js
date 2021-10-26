import AuthTemplete from "./auth/AuthTemplete";
import AuthForm from "./auth/AuthForm";
import {
  useAuthDispatchContext,
  useAuthStateContext,
} from "../context/AuthContext";
import {
  useUserDispatchContext,
  useUserStateContext,
} from "../context/UserContext";
import { useEffect, useState } from "react";
import { loginAPI, checkAPI } from "../modules/auth";
import { withRouter } from "react-router-dom";

const Login = ({ history }) => {
  const authState = useAuthStateContext();
  const authDispatch = useAuthDispatchContext();
  const { login, auth, authError } = authState;

  const userState = useUserStateContext();
  const userDispatch = useUserDispatchContext();
  const { user } = userState;

  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    authDispatch({ type: "CHANGE_FIELD", form: "login", name, value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = login;
    if ([username, password].includes("")) {
      return setError("Please fill in the field");
    }
    loginAPI(authDispatch, { username, password });
  };

  useEffect(() => {
    authDispatch({ type: "INITIALIZE_FORM", form: "login" });
  }, [authDispatch]);

  useEffect(() => {
    if (authError) {
      authDispatch({ type: "INITIALIZE_ERROR" });
      return setError("LOGIN FAIL");
    }
    if (auth) {
      checkAPI(userDispatch);
    }
  }, [auth, authError, userDispatch, authDispatch]);

  useEffect(() => {
    if (user) {
      history.push("/");
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.log("localStorage is not working");
      }
    }
  }, [history, user]);

  return (
    <AuthTemplete>
      <AuthForm
        type="LOGIN"
        form={login}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
        setError={setError}
      />
    </AuthTemplete>
  );
};

export default withRouter(Login);
