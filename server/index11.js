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
exports.authenticateJwt = exports.secret = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3001;
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//app.use("/auth", authRoutes);
//app.use("/route", router);
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
});
const recipeSchema = new mongoose_1.default.Schema({
    title: String,
    ingredients: String,
    imgLink: String,
    description: String,
    published: Boolean,
});
const User = mongoose_1.default.model("User", userSchema);
const Recipe = mongoose_1.default.model("Recipe", recipeSchema);
const jwt = __importStar(require("jsonwebtoken"));
exports.secret = "euhgh";
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, exports.secret, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!payload) {
                return res.sendStatus(403);
            }
            if (typeof payload === "string") {
                return res.sendStatus(403);
            }
            req.headers['userId'] = payload.id;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJwt = authenticateJwt;
mongoose_1.default.connect("mongodb+srv://bhavya601474:bhavyaMongoDb@cluster0.selravw.mongodb.net/", { dbName: "recipes" });
app.post("/user/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Accessed /user/signup route"); // Add this line
    const { username, password } = req.body;
    const user = yield User.findOne({ username });
    if (user) {
        res.status(403).json({ message: "Username alredy exists" });
    }
    const newUser = new User({ username, password });
    yield newUser.save();
    const token = jwt.sign({ username, role: "user" }, exports.secret, {
        expiresIn: "1hr",
    });
    res.json({ message: "Username created Successfully", token });
}));
app.post("/user/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Accessed /user/signup route"); // Add this line
    const { username, password } = req.body;
    const user = yield User.findOne({ username });
    if (user) {
        res.status(403).json({ message: "Username alredy exists" });
    }
    const newUser = new User({ username, password });
    yield newUser.save();
    const token = jwt.sign({ username, role: "user" }, exports.secret, {
        expiresIn: "1hr",
    });
    res.json({ message: "Username created Successfully", token });
}));
app.post("/user/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield User.findOne({ username, password });
    if (user) {
        res.json({ message: "Logged in Succesfully" });
    }
    else {
        res.sendStatus(403);
    }
}));
//me,put,getP,getAll recipe pub
app.get("/user/me", exports.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers['userId'];
    const user = yield User.findOne({ userId });
    if (!user) {
        res.status(403).json({ msg: "User doesnt exist" });
        return;
    }
    res.json({ username: user.username });
}));
app.post("/user/recipe", exports.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = new Recipe(req.body);
    yield recipe.save();
    res.json({ message: "Recipe created Successfully ", recipeId: recipe.id });
}));
//me,put,getP,getAll recipe pub
app.put("/user/recipe/:recipeId", exports.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield Recipe.findByIdAndUpdate(req.params.recipeId, req.body, {
        new: true,
    });
    if (recipe) {
        res.json({ message: "Recipe updated successfully" });
    }
    else {
        res.status(404).json({ message: "Recipe not found" });
    }
}));
app.get("/user/recipe/:recipeId", exports.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeId = req.params.recipeId;
    const recipe = yield Recipe.findById(recipeId);
    if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
    }
    res.json({ recipe });
}));
app.get("/user/recipes/me", exports.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield Recipe.find({});
    res.json({ recipes });
}));
app.get("/user/recipes", exports.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield Recipe.find({ published: true });
    res.json({ recipes });
}));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
