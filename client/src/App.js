import { Route } from "react-router-dom";
import { PostList, Post, Write, Register, Login } from "./components";

const App = () => {
  return (
    <>
      <Route component={PostList} path={["/@:username", "/"]} exact />
      <Route component={Login} path="/login" />
      <Route component={Register} path="/register" />
      <Route component={Write} path="/write" />
      <Route component={Post} path="/@:username/:postId" />
    </>
  );
};

export default App;
