import { Router } from "express";

const checkRoute = Router();

checkRoute.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "Check ✅ " });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default checkRoute;
