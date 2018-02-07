import {isAlpha, isAlphanumeric, isEmail, isMobilePhone, isNumeric, isEmpty} from 'validator';
import {compareSync} from "bcrypt-nodejs";
import User from './User';
import { isNullOrUndefined, error, isUndefined } from 'util';

export default class UserValidator{

    isValidRegister(req: Express.Request){
        const errors: Map<string, string> = new Map();
        const body = req['body'];

        if (isEmpty(body.userName) === true ) {
            errors.set("userName", "Missing Username");
        }

        if (isAlphanumeric(body.userName) === false ) {
            errors.set("userName", "The username can only have numbers and letters");
        }

        if (isEmpty(body.password) === true ) {
            errors.set("password", "Missing password");
        }

        if (isEmpty(body.email) === true ) {
            errors.set("email", "Missing email");
        }        

        if (isEmail(body.email) === false ) {
            errors.set("email", "Invalid email");
        }

        if (isEmpty(body.first_name) === true ) {
            errors.set("first_name", "Missing first name");
        } 

        if (isAlpha(body.first_name) === false ) {
            errors.set("first_name", "The first name can only have letters");
        }

        if (isEmpty(body.second_name) === true ) {
            errors.set("second_name", "Missing second name");
        }         

        if (isAlpha(body.second_name) === false ) {
            errors.set("second_name", "The second name can only have letters");
        }

        if (isEmpty(body.zip_code) === true ) {
            errors.set("zip_code", "Missing zip code");
        }

        if (isNumeric(body.zip_code) === false ) {
            errors.set("zip_code", "The zip code can only have numbers");
        }

        if (isEmpty(body.phone) === true ) {
            errors.set("phone", "Missing phone number");
        }

        if (isMobilePhone(body.phone, "any") === false ) {
            errors.set("phone", "Invalid phone number");
        }

        if (isNullOrUndefined(req.files.img_profile) === true) {
            errors.set("img_profile",  "Missing profile image");
        }
        
        
        return errors;
        
    }

    isValidLogin(req: Express.Request){
        const body = req['body'];
        const errors: Map<string, string> = new Map();

        if (isAlphanumeric(body.userName) === false ) {
            errors.set("userName", "The username can only have numbers and letters");
        }

        if (isEmpty(body.password) === true ) {
            errors.set("password", "Missing password");
        }
        
        return errors;

    }

    isValidPassword(password: string, user: User){
        return compareSync(password, user.getPassword());

    }

}