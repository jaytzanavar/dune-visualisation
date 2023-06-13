import { DuneClient } from '@cowprotocol/ts-dune-client';
import express from 'express';
import calculateVolumeOfSdex from '../utilities/TransformDexTransactionVolume';

export const  getVolumeSdex = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { API_KEY2 } = process.env; 
      
    try {
      let client: DuneClient;
      if (process.env.API_KEY2 && id) {
        client = new DuneClient(API_KEY2 ?? "");
  
        client
          .refresh(Number(id))
          .then(async (executionResult) => {   
             if(executionResult.result)
             {
                 const transactionVolume = calculateVolumeOfSdex(executionResult.result.rows as unknown[])
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
  };
      