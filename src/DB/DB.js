"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
class DB {
    executeQuery(query) {
        this._openConnection();
        return new Promise((resolve, rejected) => {
            this._connection.query(query, (error, results, fields) => {
                if (error)
                    rejected(error);
                resolve(results);
                this._closeConnetion();
            });
        });
    }
    _openConnection() {
        this._connection = mysql_1.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'system_db'
        });
        this._connection.connect();
    }
    _closeConnetion() {
        this._connection.end();
    }
}
exports.default = DB;
