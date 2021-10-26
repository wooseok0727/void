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
import { registerAPI, checkAPI } from "../modules/auth";
import { withRouter } from "react-router-dom";

const Register = ({ history }) => {
  const authState = useAuthStateContext();
  const authDispatch = useAuthDispatchContext();
  const { register, auth, authError } = authState;

  const userState = useUserStateContext();
  const userDispatch = useUserDispatchContext();
  const { user } = userState;

  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    authDispatch({ type: "CHANGE_FIELD", form: "register", name, value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = register;
    if ([username, password, passwordConfirm].includes("")) {
      return setError("Please fill in the field");
    }
    if (password !== passwordConfirm) {
      setError("Invalid password");
      authDispatch({
        type: "CHANGE_FIELD",
        form: "register",
        name: "password",
        value: "",
      });
      authDispatch({
        type: "CHANGE_FIELD",
        form: "register",
        name: "passwordConfirm",
        value: "",
      });
      return;
    }
    registerAPI(authDispatch, { username, password });
  };

  useEffect(() => {
    authDispatch({ type: "INITIALIZE_FORM", form: "register" });
  }, [authDispatch]);

  useEffect(() => {
    if (authError) {
      authDispatch({ type: "INITIALIZE_ERROR" });
      if (authError.response.status === 409) {
        return setError("Username already exists");
      }
      return setError("REGISTER FAIL");
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
        type="JOIN"
        form={register}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
        setError={setError}
      />
    </AuthTemplete>
  );
};

export default withRouter(Register);
