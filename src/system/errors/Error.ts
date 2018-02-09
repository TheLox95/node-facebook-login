export default class Error {
    private _map = new Map();
    
    constructor(type: string, msg: string) {
        this._map.set(type, msg);
    }
    get(type: string) {
        this._map.get(type);
    }
}