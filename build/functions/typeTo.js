"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anyToNumber = exports.ifNan = void 0;
function ifNan(n, d) {
    return isNaN(n) ? d : n;
}
exports.ifNan = ifNan;
function anyToNumber(v, d) {
    return ifNan(parseInt(v?.toString()), d);
}
exports.anyToNumber = anyToNumber;
