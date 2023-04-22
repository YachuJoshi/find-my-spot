import express from "express";
import cors from "cors";

import routes from "./routes";

export function initApp() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(express.static("public"));
  app.use("/api", routes);

  return { app };
}
