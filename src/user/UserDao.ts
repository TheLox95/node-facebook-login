import {genSaltSync, hashSync} from "bcrypt-nodejs";
import DB from "../DB/DB";
import User from "./User";
import UserParser from "./UserParser";

export default class UserDao{   

    private _db = new DB();   
    
    async getUserByUsername(username: string){
        const searchQuery = `SELECT * FROM user WHERE username="${username}"`;

        return await this._db.executeQuery(searchQuery);
    }

    async getUserByEmail(email: string){
        const searchQuery = `SELECT * FROM user WHERE email="${email}"`;

        return await this._db.executeQuery(searchQuery);
    }

    async saveUser(user: User){
        try {
            if (await this._isUsernameUsed(user)) {
                return Promise.reject("This username is already on use");
            }

            if (await this._isEmailUsed(user)) {
                return Promise.reject("This email is already on use");
            }

            let hashedPass = null;
            const userPass = user.getPassword();
            if (userPass !== undefined) {
                hashedPass = await this._hashPassword(userPass);                
            }

            const insertQuery = `INSERT INTO user 
                (user_id, username, password, email, first_name, second_name, phone, img_profile, status, created_at, zip_code) 
                VALUES 
                (${user.getId() === undefined ? `"${genSaltSync()}"`: `"${user.getId()}"`}, "${user.getNickname()}", "${hashedPass}", "${user.getEmail()}", "${user.getFirstName()}", "${user.getSecondName()}", ${user.getPhone() === undefined ? null: `${ user.getPhone()}`}, "${user.getProfileImg()}", "${user.getStatus()}", CURRENT_TIMESTAMP, ${user.getZipCode() === undefined ? null: `${user.getZipCode()}`})`;

            return await this._db.executeQuery(insertQuery).then(() => true);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    private async _hashPassword(password: string){
        const salt = genSaltSync();
        const hashedPass = hashSync(password, salt);
        return hashedPass;
    }

    private async _isUsernameUsed(user: User){
        const userNameQuery = `SELECT * FROM user WHERE username like '%${user.getNickname()}%'`;
        const usernameExist = await this._db.executeQuery(userNameQuery);

        if (usernameExist.length  > 0) {
            return true;
        }

        return false;
    }

    private async _isEmailUsed(user: User){
        const emailQuery = `SELECT * FROM user WHERE email like '%${user.getEmail()}%'`;
        const emailExist = await this._db.executeQuery(emailQuery);

        if (emailExist.length  > 0) {
            return true;
        }

        return false;
    }

}