import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import { AuthProvider, ParkingSpaceProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ParkingSpaceProvider>
        <App />
      </ParkingSpaceProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
