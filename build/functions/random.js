"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomArray = exports.getDateYears = exports.getSymbol = exports.randomChar = exports.randomIntContain = exports.randomInt = exports.toMaxMin = exports.symbolAgg = void 0;
exports.symbolAgg = ",./;'";
function toMaxMin(n1, n2) {
    return n1 > n2 ? { max: n1, min: n2 } : { max: n2, min: n1 };
}
exports.toMaxMin = toMaxMin;
// [min,max)
function randomInt(min, max) {
    const nMaxMin = toMaxMin(min, max);
    min = nMaxMin.min;
    max = nMaxMin.max;
    return min + Math.floor(Math.random() * (max - min));
}
exports.randomInt = randomInt;
// [min,max]
function randomIntContain(min, max) {
    return min == max ? min : randomInt(min, max + 1);
}
exports.randomIntContain = randomIntContain;
function randomChar(isCase) {
    const n = String.fromCharCode(randomInt(97, 122));
    return isCase ? n.toUpperCase() : n;
}
exports.randomChar = randomChar;
function getSymbol() {
    return exports.symbolAgg[randomInt(0, exports.symbolAgg.length)];
}
exports.getSymbol = getSymbol;
function getDateYears() {
    return randomInt(1970, new Date().getFullYear());
}
exports.getDateYears = getDateYears;
function randomArray(_arr) {
    const arr = [..._arr];
    const rCount = Math.round(arr.length / 2);
    for (let i = 0; i < rCount; i++) {
        const v1 = arr[i];
        const rIndex = randomInt(rCount, arr.length);
        arr[i] = arr[rIndex];
        arr[rIndex] = v1;
    }
    return arr;
}
exports.randomArray = randomArray;
