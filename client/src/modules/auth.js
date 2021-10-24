import client from "./client";

export const loginAPI = async (dispatch, { username, password }) => {
  dispatch({ type: "LOGIN" });
  try {
    const response = await client.post("/api/auth/login", {
      username,
      password,
    });
    dispatch({ type: "LOGIN_SUCCESS", auth: response.data });
  } catch (e) {
    dispatch({ type: "LOGIN_FAILURE", authError: e });
  }
};

export const registerAPI = async (dispatch, { username, password }) => {
  dispatch({ type: "REGISTER" });
  try {
    const response = await client.post("/api/auth/register", {
      username,
      password,
    });
    dispatch({ type: "REGISTER_SUCCESS", auth: response.data });
  } catch (e) {
    dispatch({ type: "REGISTER_FAILURE", authError: e });
  }
};

export const checkAPI = async (dispatch) => {
  try {
    const response = await client.get("/api/auth/check");
    dispatch({ type: "CHECK_SUCCESS", user: response.data });
  } catch (e) {
    await dispatch({ type: "CHECK_FAILURE", checkError: e });
    localStorage.removeItem("user");
  }
};

export const logoutAPI = async (dispatch) => {
  try {
    await client.post("/api/auth/logout");
    await dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  } catch (e) {
    console.log(e);
  }
};
