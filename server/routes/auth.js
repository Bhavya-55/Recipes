"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt = __importStar(require("jsonwebtoken"));
const midd_1 = require("../middleware/midd");
//import * as jwt from 'jsonwebtoken';
const db_1 = require("../db/db");
const router = express_1.default.Router();
router.post("/user/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Accessed /user/signup route"); // Add this line
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username });
    if (user) {
        res.status(403).json({ message: "Username alredy exists" });
    }
    const newUser = new db_1.User({ username, password });
    yield newUser.save();
    const token = jwt.sign({ username, role: "user" }, midd_1.secret, {
        expiresIn: "1hr",
    });
    res.json({ message: "Username created Successfully", token });
}));
router.post("/user/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username, password });
    if (user) {
        res.json({ message: "Logged in Succesfully" });
    }
    else {
        res.sendStatus(403);
    }
}));
//me,put,getP,getAll recipe pub
router.get("/user/me", midd_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers['userId'];
    const user = yield db_1.User.findOne({ userId });
    if (!user) {
        res.status(403).json({ msg: "User doesnt exist" });
        return;
    }
    res.json({ username: user.username });
}));
exports.default = router;
