"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormErrors {
    constructor() {
        this._map = new Map();
    }
    forField(field, msg) {
        this._map.set(field, msg);
    }
    get(field) {
        return this._map.get(field);
    }
    size() {
        return this._map.size;
    }
}
exports.default = FormErrors;
