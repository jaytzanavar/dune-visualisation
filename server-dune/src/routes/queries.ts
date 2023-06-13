import { Router } from "express";
import { DuneClient } from "@cowprotocol/ts-dune-client";
import transformData  from '../utilities/transformData';
import { getVolume } from "../controlers/getQueryData";
import { getVolumeSdex } from "../controlers/getVolumeSdex";
//  
// const Redis = require("redis");

// const redisClient = Redis.createClient(6379, "127.0.0.1");

export const queryRoutes = Router();

console.log("THE DUNE API KEY", process.env.API_KEY2);


queryRoutes.get("/volume/:id", getVolume );
queryRoutes.get("/volume/sdex/:id", getVolumeSdex );



