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
const UserValidator_1 = require("./UserValidator");
const UserParser_1 = require("./UserParser");
const UserDao_1 = require("./UserDao");
const FileUpload_1 = require("../formHelper/FileUpload");
const FormErrors_1 = require("../system/errors/FormErrors");
class UserController {
    static handleSignUpForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validator = new UserValidator_1.default();
                let parser = new UserParser_1.default();
                const errors = validator.isValidRegister(req);
                if (errors.size()) {
                    return Promise.reject(errors);
                }
                const user = parser.fromFormBody(req.body);
                const fileName = yield FileUpload_1.default(req, res, user);
                user.setProfileImg(fileName);
                const userDao = new UserDao_1.default();
                const result = yield userDao.saveUser(user);
                if (result === true) {
                    return "registered";
                }
            }
            catch (error) {
                return Promise.reject(error.toString());
            }
        });
    }
    static handleLogin(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDao = new UserDao_1.default();
                const validator = new UserValidator_1.default();
                const parser = new UserParser_1.default();
                const formErrors = new FormErrors_1.default();
                const errors = validator.isValidLogin(req);
                if (errors.size()) {
                    return Promise.reject(errors);
                }
                const result = yield userDao.getUserByUsername(req.body.userName);
                if (result.length === 0) {
                    formErrors.forField("userName", "Username not register");
                    return Promise.reject(formErrors);
                }
                const user = parser.fromSqlResult(result);
                const isValidPassword = validator.isValidPassword(req.body.password, user);
                if (isValidPassword === false) {
                    formErrors.forField("password", "Invalid password");
                    return Promise.reject(formErrors);
                }
                if (!req.session) {
                    return Promise.reject(new Error("there is no session active"));
                }
                req.session.userId = user.getId();
                return Promise.resolve(user);
            }
            catch (error) {
                return Promise.reject(error.toString());
            }
        });
    }
    static handleFacebookLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDao = new UserDao_1.default();
                const parser = new UserParser_1.default();
                const formErrors = new FormErrors_1.default();
                const result = yield userDao.getUserByEmail(res.email);
                if (result.length > 0) {
                    return Promise.reject(formErrors.forField("userName", "This email is already register"));
                }
                const user = parser.fromFacebookResponse(res);
                userDao.saveUser(user);
                if (!req.session) {
                    return Promise.reject(new Error("there is no session active"));
                }
                req.session.userId = user.getId();
                return Promise.resolve(user);
            }
            catch (error) {
                return Promise.reject(error.toString());
            }
        });
    }
}
exports.default = UserController;
