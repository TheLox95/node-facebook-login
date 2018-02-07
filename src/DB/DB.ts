import {createConnection, Connection as MysqlConnection} from "mysql";

export default class DB{

    private _connection: MysqlConnection;

    executeQuery(query: string): Promise<any>{
        this._openConnection();
        return new Promise((resolve, rejected) => {
            this._connection.query(query, (error, results, fields) => {
                if (error) rejected(error);
                resolve(results);           
                this._closeConnetion();                
              });
        });
    }

    private _openConnection(){     
        this._connection = createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'system_db'
          });     
          this._connection.connect();
    }

    private _closeConnetion(){
        this._connection.end();
    }
    
}