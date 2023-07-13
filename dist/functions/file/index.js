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
exports.run = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
function readCSVFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = [];
        return new Promise((resolve, reject) => {
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    });
}
const run = (events) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(events);
    const filePath = 'src\functions\file\accountsProd.csv';
    readCSVFile(filePath)
        .then((data) => {
        console.log(data);
    })
        .catch((error) => {
        console.error(error);
    });
    const updateTask = 'https://api.data365.co/v1.1/linkedin/member/rshruthi/update?load_activities=true&max_activities=50&access_token=ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKSmJtUnBZVzVKYm5OMGFYUjFkR1Z2WmxSbFkyaHViMnh2WjNsTFlXNXdkWElpTENKcFlYUWlPakUyT0RnMk16UXdOakF1TnpnME1UazJObjAuRWw1YllMTWtwbzdTRDNuVGRmSXlDZUtDMXhWSTgxbllLWm5QSE1Va19BYw==';
    try {
        const resp = yield fetch(updateTask, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json, text/plain, */*',
            }
        });
    }
    catch (error) {
        console.log('Failed to post to timeline: ', error);
    }
    const getStatus = 'https://api.data365.co/v1.1/linkedin/member/rshruthi/update?access_token=ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKSmJtUnBZVzVKYm5OMGFYUjFkR1Z2WmxSbFkyaHViMnh2WjNsTFlXNXdkWElpTENKcFlYUWlPakUyT0RnMk16UXdOakF1TnpnME1UazJObjAuRWw1YllMTWtwbzdTRDNuVGRmSXlDZUtDMXhWSTgxbllLWm5QSE1Va19BYw==';
    for (;;) {
        try {
            const resp = yield fetch(getStatus, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json, text/plain, */*',
                }
            });
            const response = yield resp.json();
            const status = response.data.status;
            if (status === 'pending') {
                console.log('Status is pending. Calling API again...');
                continue;
            }
            else if (status === 'finished' || status === 'created') {
                break;
            }
        }
        catch (error) {
            console.log('Failed to post to timeline: ', error);
        }
    }
    const getCachedData = 'https://api.data365.co/v1.1/linkedin/member/dpandey?access_token=ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKSmJtUnBZVzVKYm5OMGFYUjFkR1Z2WmxSbFkyaHViMnh2WjNsTFlXNXdkWElpTENKcFlYUWlPakUyT0RnMk16UXdOakF1TnpnME1UazJObjAuRWw1YllMTWtwbzdTRDNuVGRmSXlDZUtDMXhWSTgxbllLWm5QSE1Va19BYw==';
    try {
        const resp = yield fetch(getCachedData, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json, text/plain, */*',
            }
        });
        console.log(resp);
    }
    catch (error) {
        console.log('Failed to get user data: ', error);
    }
    const getCachedPosts = 'https://api.data365.co/v1.1/linkedin/member/dpandey/activity/created_post/posts?order_by=date_desc&max_page_size=50&access_token=ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKSmJtUnBZVzVKYm5OMGFYUjFkR1Z2WmxSbFkyaHViMnh2WjNsTFlXNXdkWElpTENKcFlYUWlPakUyT0RnMk16UXdOakF1TnpnME1UazJObjAuRWw1YllMTWtwbzdTRDNuVGRmSXlDZUtDMXhWSTgxbllLWm5QSE1Va19BYw==';
    let resp;
    try {
        resp = yield fetch(getCachedPosts, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json, text/plain, */*',
            }
        });
    }
    catch (error) {
        console.error('API error:', error);
    }
    //response = resp?.json
    //for item in resp.data
    return { 'input_event': events[0] };
});
exports.run = run;
exports.default = exports.run;
