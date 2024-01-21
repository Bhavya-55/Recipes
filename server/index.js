"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3001;
const mongoose_1 = __importDefault(require("mongoose"));
//import * as cors from 'cors';
const auth_1 = __importDefault(require("../server/routes/auth"));
const route_1 = __importDefault(require("../server/routes/route"));
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/route", route_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
mongoose_1.default.connect("mongodb+srv://bhavya601474:bhavyaMongoDb@cluster0.selravw.mongodb.net/", { dbName: "recipes" });
