"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionFactory = void 0;
var index_1 = require("./functions/file/index");
var index_2 = require("./functions/function_2/index");
exports.functionFactory = {
    file: index_1.default,
    function_2: index_2.default
};
