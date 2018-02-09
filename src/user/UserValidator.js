"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("validator");
const bcrypt_nodejs_1 = require("bcrypt-nodejs");
const util_1 = require("util");
const FormErrors_1 = require("../system/errors/FormErrors");
class UserValidator {
    isValidRegister(req) {
        const errors = new FormErrors_1.default();
        const body = req['body'];
        if (validator_1.isEmpty(body.userName) === true) {
            errors.forField("userName", "Missing Username");
        }
        if (validator_1.isAlphanumeric(body.userName) === false) {
            errors.forField("userName", "The username can only have numbers and letters");
        }
        if (validator_1.isEmpty(body.password) === true) {
            errors.forField("password", "Missing password");
        }
        if (validator_1.isEmpty(body.email) === true) {
            errors.forField("email", "Missing email");
        }
        if (validator_1.isEmail(body.email) === false) {
            errors.forField("email", "Invalid email");
        }
        if (validator_1.isEmpty(body.first_name) === true) {
            errors.forField("first_name", "Missing first name");
        }
        if (validator_1.isAlpha(body.first_name) === false) {
            errors.forField("first_name", "The first name can only have letters");
        }
        if (validator_1.isEmpty(body.second_name) === true) {
            errors.forField("second_name", "Missing second name");
        }
        if (validator_1.isAlpha(body.second_name) === false) {
            errors.forField("second_name", "The second name can only have letters");
        }
        if (validator_1.isEmpty(body.zip_code) === true) {
            errors.forField("zip_code", "Missing zip code");
        }
        if (validator_1.isNumeric(body.zip_code) === false) {
            errors.forField("zip_code", "The zip code can only have numbers");
        }
        if (validator_1.isEmpty(body.phone) === true) {
            errors.forField("phone", "Missing phone number");
        }
        if (validator_1.isMobilePhone(body.phone, "any") === false) {
            errors.forField("phone", "Invalid phone number");
        }
        if (util_1.isNullOrUndefined(req.files.img_profile) === true) {
            errors.forField("img_profile", "Missing profile image");
        }
        return errors;
    }
    isValidLogin(req) {
        const body = req['body'];
        const errors = new FormErrors_1.default();
        if (validator_1.isAlphanumeric(body.userName) === false) {
            errors.forField("userName", "The username can only have numbers and letters");
        }
        if (validator_1.isEmpty(body.password) === true) {
            errors.forField("password", "Missing password");
        }
        return errors;
    }
    isValidPassword(password, user) {
        return bcrypt_nodejs_1.compareSync(password, user.getPassword());
    }
}
exports.default = UserValidator;
