import React from "react";
import ReactDOM from "react-dom/client";
import { AppModule } from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppModule.App/>
  </React.StrictMode>,
);
