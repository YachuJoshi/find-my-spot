import express from "express";
import {
  getNearestParkingSpotLocation,
  recheckParkSpotById,
} from "./location.services";

const router = express.Router();

router.get("/", getNearestParkingSpotLocation);
router.get("/:id", recheckParkSpotById);

export default router;
