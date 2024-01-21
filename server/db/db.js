"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = exports.User = exports.recipeSchema = exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
});
exports.recipeSchema = new mongoose_1.default.Schema({
    title: String,
    ingredients: String,
    imgLink: String,
    description: String,
    published: Boolean,
});
exports.User = mongoose_1.default.model("User", exports.userSchema);
exports.Recipe = mongoose_1.default.model("Recipe", exports.recipeSchema);
