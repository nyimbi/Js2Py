// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.4.4.19-8-b-4
description: >
    Array.prototype.map - properties added into own object after
    current position are visited on an Array-like object
includes: [runTestCase.js]
---*/

function testcase() {

        function callbackfn(val, idx, obj) {
            if (idx === 1 && val === 1) {
                return false;
            } else {
                return true;
            }
        }

        var obj = { length: 2 };

        Object.defineProperty(obj, "0", {
            get: function () {
                Object.defineProperty(obj, "1", {
                    get: function () {
                        return 1;
                    },
                    configurable: true
                });
                return 0;
            },
            configurable: true
        });

        var testResult = Array.prototype.map.call(obj, callbackfn);
        return testResult[0] === true && testResult[1] === false;
    }
runTestCase(testcase);
