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
exports.constructURL = exports.getCall = exports.postCall = void 0;
const axios_1 = __importDefault(require("axios"));
const defaultResponse = {
    success: false,
    errMessage: '',
    code: 0,
    data: {},
};
function postCall(endpoint, authKey, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.post(endpoint, payload, {
                headers: {
                    Authorization: authKey,
                    'Content-type': 'application/json',
                },
            });
            const data = res.data;
            return Object.assign(Object.assign({}, defaultResponse), { code: res.status, success: true, data: data });
        }
        catch (error) {
            if (error.response) {
                return Object.assign(Object.assign({}, defaultResponse), { errMessage: error.response.data, code: error.code });
            }
            else if (error.request) {
                return Object.assign(Object.assign({}, defaultResponse), { errMessage: error.request.data, code: error.code });
            }
            else {
                return Object.assign(Object.assign({}, defaultResponse), { code: error.code, errMessage: error });
            }
        }
    });
}
exports.postCall = postCall;
function getCall(endpoint, authKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get(endpoint, {
                headers: {
                    Authorization: authKey,
                },
            });
            const data = res.data;
            return Object.assign(Object.assign({}, defaultResponse), { success: true, data: data });
        }
        catch (error) {
            if (error.response) {
                return Object.assign(Object.assign({}, defaultResponse), { errMessage: error.response.data });
            }
            else if (error.request) {
                return Object.assign(Object.assign({}, defaultResponse), { errMessage: error.request.data });
            }
            else {
                return Object.assign(Object.assign({}, defaultResponse), { errMessage: error });
            }
        }
    });
}
exports.getCall = getCall;
function constructURL(endpoint, paramsAsPayload) {
    const url = new URL(endpoint);
    const params = url.searchParams;
    for (const paramsKey in paramsAsPayload) {
        params.append(paramsKey, paramsAsPayload[paramsKey]);
    }
    return url.toString();
}
exports.constructURL = constructURL;
