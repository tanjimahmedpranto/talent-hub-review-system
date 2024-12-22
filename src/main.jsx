import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "./redux/store";
import "./index.css";
import App from "./App.jsx";

// Create the root element
const root = createRoot(document.getElementById("root"));

// Render the app with Redux store and StrictMode
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
