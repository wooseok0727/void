import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import UserContextProvider from "./context/UserContext";
import WriteContextProvider from "./context/WriteContext";
import PostContextProvider from "./context/PostContext";
import PostsContextProvider from "./context/PostsContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <WriteContextProvider>
          <PostContextProvider>
            <PostsContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </PostsContextProvider>
          </PostContextProvider>
        </WriteContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
