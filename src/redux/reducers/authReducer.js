const initialState = {
  token: null,
  userData: null,
};

try {
  const token = localStorage.getItem("token");
  if (token) {
    initialState.token = token;
  }
} catch (error) {
  console.error("Error parsing token from localStorage:", error);
}

try {
  const userData = localStorage.getItem("userData");
  if (userData && userData !== "undefined") {
    // Check if userData is not undefined
    initialState.userData = JSON.parse(userData);
  }
} catch (error) {
  console.error("Error parsing userData from localStorage:", error);
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userData", JSON.stringify(action.payload.userData));
      return {
        ...state,
        token: action.payload.token,
        userData: action.payload.userData,
      };
    case "REGISTER_SUCCESS":
      localStorage.setItem("userData", JSON.stringify(action.payload)); // Store user data upon successful registration
      return {
        ...state,
        userData: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      return {
        ...state,
        token: null,
        userData: null,
      };
    default:
      return state;
  }
};

export default authReducer;
