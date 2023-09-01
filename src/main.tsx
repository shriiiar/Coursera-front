import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";
import AppContext from "./context/AppContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContext>
        <App />
      </AppContext>
    </Provider>
  </React.StrictMode>
);
