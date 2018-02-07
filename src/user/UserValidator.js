"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("validator");
const bcrypt_nodejs_1 = require("bcrypt-nodejs");
const util_1 = require("util");
class UserValidator {
    isValidRegister(req) {
        const errors = new Map();
        const body = req['body'];
        if (validator_1.isEmpty(body.userName) === true) {
            errors.set("userName", "Missing Username");
        }
        if (validator_1.isAlphanumeric(body.userName) === false) {
            errors.set("userName", "The username can only have numbers and letters");
        }
        if (validator_1.isEmpty(body.password) === true) {
            errors.set("password", "Missing password");
        }
        if (validator_1.isEmpty(body.email) === true) {
            errors.set("email", "Missing email");
        }
        if (validator_1.isEmail(body.email) === false) {
            errors.set("email", "Invalid email");
        }
        if (validator_1.isEmpty(body.first_name) === true) {
            errors.set("first_name", "Missing first name");
        }
        if (validator_1.isAlpha(body.first_name) === false) {
            errors.set("first_name", "The first name can only have letters");
        }
        if (validator_1.isEmpty(body.second_name) === true) {
            errors.set("second_name", "Missing second name");
        }
        if (validator_1.isAlpha(body.second_name) === false) {
            errors.set("second_name", "The second name can only have letters");
        }
        if (validator_1.isEmpty(body.zip_code) === true) {
            errors.set("zip_code", "Missing zip code");
        }
        if (validator_1.isNumeric(body.zip_code) === false) {
            errors.set("zip_code", "The zip code can only have numbers");
        }
        if (validator_1.isEmpty(body.phone) === true) {
            errors.set("phone", "Missing phone number");
        }
        if (validator_1.isMobilePhone(body.phone, "any") === false) {
            errors.set("phone", "Invalid phone number");
        }
        if (util_1.isNullOrUndefined(req.files.img_profile) === true) {
            errors.set("img_profile", "Missing profile image");
        }
        return errors;
    }
    isValidLogin(req) {
        const body = req['body'];
        const errors = new Map();
        if (validator_1.isAlphanumeric(body.userName) === false) {
            errors.set("userName", "The username can only have numbers and letters");
        }
        if (validator_1.isEmpty(body.password) === true) {
            errors.set("password", "Missing password");
        }
        return errors;
    }
    isValidPassword(password, user) {
        return bcrypt_nodejs_1.compareSync(password, user.getPassword());
    }
}
exports.default = UserValidator;
