"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const credentials = require("./Credentials");
class DB {
    executeQuery(query) {
        return new Promise((resolve, rejected) => {
            this._openConnection().catch(rejected);
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
            host: credentials.host,
            user: credentials.user,
            password: credentials.password,
            database: credentials.database
        });
        return new Promise((resolve, rejected) => {
            this._connection.connect(rejected);
            resolve();
        });
    }
    _closeConnetion() {
        this._connection.end();
    }
}
exports.default = DB;
