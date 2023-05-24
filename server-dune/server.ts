import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { DuneClient } from "@cowprotocol/ts-dune-client";
import { queryRoutes } from "./routes/queries";
import checkRoute from "./routes/check";

dotenv.config();
const app = express();
app.use(cors());
const { API_KEY } = process.env;
const PORT = process.env.PORT || 3030;

// Exclude the debug logs from lower level dependency.
// console.debug = function () {};
app.use("/check", checkRoute);
app.use("/query", queryRoutes);

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
