import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { DuneClient } from "@cowprotocol/ts-dune-client";
import { queryRoutes } from "./routes/queries";

dotenv.config();
const app = express();
app.use(cors());
const { API_KEY } = process.env;

// Exclude the debug logs from lower level dependency.
// console.debug = function () {};
app.get("/", async (req, res) => {
  console.log("check!");
  return res.sendStatus(200);
});
app.use("/query", queryRoutes);
const PORT = process.env.PORT || 6001;

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
