import {isAlpha, isAlphanumeric, isEmail, isMobilePhone, isNumeric, isEmpty} from 'validator';
import {compareSync} from "bcrypt-nodejs";
import User from './User';
import { isNullOrUndefined, error, isUndefined } from 'util';
import FormError from '../system/errors/FormError';
import FormErrors from '../system/errors/FormErrors';

export default class UserValidator{

    isValidRegister(req: Express.Request){
        const errors = new FormErrors();
        const body = req['body'];

        if (isEmpty(body.userName) === true ) {
            errors.forField("userName", "Missing Username");
        }

        if (isAlphanumeric(body.userName) === false ) {
            errors.forField("userName", "The username can only have numbers and letters");
        }

        if (isEmpty(body.password) === true ) {
            errors.forField("password", "Missing password");
        }

        if (isEmpty(body.email) === true ) {
            errors.forField("email", "Missing email");
        }        

        if (isEmail(body.email) === false ) {
            errors.forField("email", "Invalid email");
        }

        if (isEmpty(body.first_name) === true ) {
            errors.forField("first_name", "Missing first name");
        } 

        if (isAlpha(body.first_name) === false ) {
            errors.forField("first_name", "The first name can only have letters");
        }

        if (isEmpty(body.second_name) === true ) {
            errors.forField("second_name", "Missing second name");
        }         

        if (isAlpha(body.second_name) === false ) {
            errors.forField("second_name", "The second name can only have letters");
        }

        if (isEmpty(body.zip_code) === true ) {
            errors.forField("zip_code", "Missing zip code");
        }

        if (isNumeric(body.zip_code) === false ) {
            errors.forField("zip_code", "The zip code can only have numbers");
        }

        if (isEmpty(body.phone) === true ) {
            errors.forField("phone", "Missing phone number");
        }

        if (isMobilePhone(body.phone, "any") === false ) {
            errors.forField("phone", "Invalid phone number");
        }

        if (isNullOrUndefined(req.files.img_profile) === true) {
            errors.forField("img_profile",  "Missing profile image");
        }
        
        
        return errors;
        
    }

    isValidLogin(req: Express.Request){
        const body = req['body'];
        const errors: FormErrors = new FormErrors();

        if (isAlphanumeric(body.userName) === false ) {
            errors.forField("userName", "The username can only have numbers and letters");
        }

        if (isEmpty(body.password) === true ) {
            errors.forField("password", "Missing password");            
        }
        
        return errors;

    }

    isValidPassword(password: string, user: User){
        return compareSync(password, user.getPassword());

    }

}