"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Error {
    constructor(type, msg) {
        this._map = new Map();
        this._map.set(type, msg);
    }
    get(type) {
        this._map.get(type);
    }
}
exports.default = Error;
