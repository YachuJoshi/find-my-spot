import express from "express";
import { locationRoutes } from "./location";

const router = express.Router();

router.use("/location", locationRoutes);

export default router;
