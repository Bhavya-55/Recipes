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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const midd_1 = require("../middleware/midd");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/user/recipe", midd_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = new db_1.Recipe(req.body);
    yield recipe.save();
    res.json({ message: "Recipe created Successfully ", recipeId: recipe.id });
}));
//me,put,getP,getAll recipe pub
router.put("/user/recipe/:recipeId", midd_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield db_1.Recipe.findByIdAndUpdate(req.params.recipeId, req.body, {
        new: true,
    });
    if (recipe) {
        res.json({ message: "Recipe updated successfully" });
    }
    else {
        res.status(404).json({ message: "Recipe not found" });
    }
}));
router.get("/user/recipe/:recipeId", midd_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeId = req.params.recipeId;
    const recipe = yield db_1.Recipe.findById(recipeId);
    if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
    }
    res.json({ recipe });
}));
router.get("/user/recipes", midd_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield db_1.Recipe.find({ published: true });
    res.json({ recipes });
}));
exports.default = router;
