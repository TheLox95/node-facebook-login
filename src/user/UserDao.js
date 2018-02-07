"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_nodejs_1 = require("bcrypt-nodejs");
const DB_1 = require("../DB/DB");
class UserDao {
    constructor() {
        this._db = new DB_1.default();
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchQuery = `SELECT * FROM user WHERE username="${username}"`;
            return yield this._db.executeQuery(searchQuery);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchQuery = `SELECT * FROM user WHERE email="${email}"`;
            return yield this._db.executeQuery(searchQuery);
        });
    }
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield this._isUsernameUsed(user)) {
                    return Promise.reject((new Map()).set("username", "This username is already on use"));
                }
                if (yield this._isEmailUsed(user)) {
                    return Promise.reject((new Map()).set("email", "This email is already on use"));
                }
                let hashedPass = null;
                const userPass = user.getPassword();
                if (userPass !== undefined) {
                    hashedPass = yield this._hashPassword(userPass);
                }
                const insertQuery = `INSERT INTO user 
                (user_id, username, password, email, first_name, second_name, phone, img_profile, status, created_at, zip_code) 
                VALUES 
                (${user.getId() === undefined ? `"${bcrypt_nodejs_1.genSaltSync()}"` : `"${user.getId()}"`}, "${user.getNickname()}", "${hashedPass}", "${user.getEmail()}", "${user.getFirstName()}", "${user.getSecondName()}", ${user.getPhone() === undefined ? null : `${user.getPhone()}`}, "${user.getProfileImg()}", "${user.getStatus()}", CURRENT_TIMESTAMP, ${user.getZipCode() === undefined ? null : `${user.getZipCode()}`})`;
                return yield this._db.executeQuery(insertQuery).then(() => true);
            }
            catch (error) {
                console.log(error);
                return Promise.reject(error);
            }
        });
    }
    _hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = bcrypt_nodejs_1.genSaltSync();
            const hashedPass = bcrypt_nodejs_1.hashSync(password, salt);
            return hashedPass;
        });
    }
    _isUsernameUsed(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userNameQuery = `SELECT * FROM user WHERE username like '%${user.getNickname()}%'`;
            const usernameExist = yield this._db.executeQuery(userNameQuery);
            if (usernameExist.length > 0) {
                return true;
            }
            return false;
        });
    }
    _isEmailUsed(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailQuery = `SELECT * FROM user WHERE email like '%${user.getEmail()}%'`;
            const emailExist = yield this._db.executeQuery(emailQuery);
            if (emailExist.length > 0) {
                return true;
            }
            return false;
        });
    }
}
exports.default = UserDao;
