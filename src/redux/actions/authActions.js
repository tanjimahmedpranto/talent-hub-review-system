import axios from "axios";

// Action Types
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";

// Action Creators
export const loginSuccess = (token, userData) => ({
  type: LOGIN_SUCCESS,
  payload: { token, userData },
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
  //payload: userData,
});

export const logout = () => ({
  type: LOGOUT,
});

// Login action (JWT Authentication)
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("/api/users/login", { email, password });
    const { token, userData } = response.data;

    // Save token to localStorage (optional)
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));

    // Dispatch login success action
    dispatch(loginSuccess(token, userData));
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

// Register action
export const registerUser = (formData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/users/signup", formData);
    const { data } = response;

    // Dispatch register success action
    dispatch(registerSuccess(data));

    return Promise.resolve("Registration successful");
  } catch (error) {
    console.error("Registration failed", error);
    return Promise.reject(error);
  }
};

// Logout action (remove token from storage)
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  dispatch(logout());
};
