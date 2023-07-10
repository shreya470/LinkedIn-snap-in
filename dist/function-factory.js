"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionFactory = void 0;
const index_1 = __importDefault(require("./functions/file/index"));
const index_2 = __importDefault(require("./functions/function_2/index"));
exports.functionFactory = {
    file: index_1.default,
    function_2: index_2.default
};
