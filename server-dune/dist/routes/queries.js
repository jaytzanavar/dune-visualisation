"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRoutes = void 0;
const express_1 = require("express");
const ts_dune_client_1 = require("@cowprotocol/ts-dune-client");
exports.queryRoutes = (0, express_1.Router)();
console.log("THE DUNE API KEY", process.env.API_KEY);
// queryRoutes.get("/", async (req, res) => {
//   console.log("res", res);
//   console.log("request ", req.params);
//   res.sendStatus(200);
// });
exports.queryRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(" querying dune for query... ", req.params.id);
    const { id } = req.params;
    const { API_KEY } = process.env;
    let client;
    if (process.env.API_KEY && id) {
        client = new ts_dune_client_1.DuneClient(API_KEY !== null && API_KEY !== void 0 ? API_KEY : "");
        client.refresh(Number(id)).then((executionResult) => {
            var _a;
            console.log((_a = executionResult.result) === null || _a === void 0 ? void 0 : _a.rows);
            res.status(200).send(executionResult);
        });
        //const queryID = ;
    }
}));
