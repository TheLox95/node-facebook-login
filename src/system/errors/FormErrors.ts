export default class FormErrors{

    private _map = new Map<string, string>();

    forField(field: string, msg: string){
        this._map.set(field, msg);
    }

    get(field: string){
        return this._map.get(field);
    }

    size(): number{
        return this._map.size;
    }

}