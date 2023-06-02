import { Router } from "express";
import { DuneClient } from "@cowprotocol/ts-dune-client";
import transformData  from '../utilities/transformData';
//  
// const Redis = require("redis");

// const redisClient = Redis.createClient(6379, "127.0.0.1");

export const queryRoutes = Router();

console.log("THE DUNE API KEY", process.env.API_KEY);

// redisClient.on("error", (err: any) => {
//   console.log("Error occured while connecting or accessing redis server");
// });

queryRoutes.get("/volume/:id", async (req, res) => {
  console.log(" querying dune for query... ", req.params.id);
  const { id } = req.params;
  const { API_KEY } = process.env;
  // if (!redisClient.connected) await redisClient.connect();
  // redisClient.get("res", (error: any, resp: string) => {
  //   if (error) console.error(error);
  //   if (res != null) {
  //     return res.json(JSON.p`arse(resp));
  //   }
  // });

  try {
    let client: DuneClient;
    if (process.env.API_KEY && id) {
      client = new DuneClient(API_KEY ?? "");

      client
        .refresh(Number(id))
        .then(async (executionResult) => {
          console.log(executionResult.result?.rows);
           //redisClient.set("res", JSON.stringify(res));
           if(executionResult.result)
           {
               const transactionVolume = transformData(executionResult.result.rows as unknown[])
               res.status(200).send(transactionVolume);
           }
          
        })
        .catch((err) => {
          console.log("ERROR in query", err);
        });

      //const queryID = ;
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
  // await redisClient.disconnect();
});


