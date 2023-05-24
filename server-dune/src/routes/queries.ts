import { Router } from "express";
import { DuneClient } from "@cowprotocol/ts-dune-client";

export const queryRoutes = Router();

console.log("THE DUNE API KEY", process.env.API_KEY);

// queryRoutes.get("/", async (req, res) => {
//   console.log("res", res);
//   console.log("request ", req.params);
//   res.sendStatus(200);
// });

queryRoutes.get("/:id", async (req, res) => {
  console.log(" querying dune for query... ", req.params.id);
  const { id } = req.params;
  const { API_KEY } = process.env;
  let client: DuneClient;
  if (process.env.API_KEY && id) {
    client = new DuneClient(API_KEY ?? "");
    client.refresh(Number(id)).then((executionResult) => {
      console.log(executionResult.result?.rows);
      res.status(200).send(executionResult);
    });

    //const queryID = ;
  }
});
