"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const queries_1 = require("./routes/queries");
const check_1 = __importDefault(require("./routes/check"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const { API_KEY } = process.env;
const PORT = process.env.PORT || 3030;
// Exclude the debug logs from lower level dependency.
// console.debug = function () {};
app.use("/check", check_1.default);
app.use("/query", queries_1.queryRoutes);
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
