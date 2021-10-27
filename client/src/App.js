import React, { useCallback, useEffect } from "react";
import * as CTX from "./context";
import { Route } from "react-router-dom";
import { PostList, Post, Write, Register, Login } from "./components";
import Header from "./components/common/Header";
import { useUserDispatchContext } from "./context/UserContext";
import { checkAPI } from "./modules/auth";
import { Helmet } from "react-helmet-async";

const AppProvider = ({ contexts, children }) =>
  contexts.reduce(
    (prev, context) =>
      React.createElement(context, {
        children: prev,
      }),
    children
  );

const App = () => {
  const userDispatch = useUserDispatchContext();

  const loadUser = useCallback(async () => {
    try {
      const user = localStorage.getItem("user");
      if (!user) return;
      await userDispatch({ type: "TEMP_SET_USER", user: JSON.parse(user) });
      await checkAPI(userDispatch);
    } catch (e) {
      console.log("localStorage is not working");
    }
  }, [userDispatch]);

  useEffect(loadUser, [loadUser]);

  return (
    <AppProvider
      contexts={[
        CTX.AuthContextProvider,
        CTX.UserContextProvider,
        CTX.WriteContextProvider,
        CTX.PostsContextProvider,
        CTX.PostContextProvider,
      ]}
    >
      <Helmet>
        <title>VOID</title>
      </Helmet>
      <Header />
      <Route component={PostList} path={["/@:username", "/"]} exact />
      <Route component={Login} path="/login" />
      <Route component={Register} path="/register" />
      <Route component={Write} path="/write" />
      <Route component={Post} path="/@:username/:postId" />
    </AppProvider>
  );
};

export default App;
