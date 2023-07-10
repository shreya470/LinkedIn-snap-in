"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_runner_1 = require("../../test-runner/test-runner");
describe('Example Index Test file', function () {
    it('Testing the method', function () {
        (0, test_runner_1.testRunner)({
            fixturePath: 'function_1_event.json',
            functionName: 'file',
        });
    });
});
