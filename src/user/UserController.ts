import UserValidator from "./UserValidator";
import User from "./User";
import UserParser from "./UserParser";
import UserDao from "./UserDao";
import handleImageUpload from "../formHelper/FileUpload";
import FormErrors from "../system/errors/FormErrors";


export default class UserController {

    static async handleSignUpForm(req: Express.Request, res) {
        try {
            let validator: UserValidator = new UserValidator();
            let parser: UserParser = new UserParser();

            const errors = validator.isValidRegister(req);
            if (errors.size()) {
                return Promise.reject(errors);
            }

            const user = parser.fromFormBody(req.body);

            const fileName = await handleImageUpload(req, res, user);

            user.setProfileImg(fileName);

            const userDao = new UserDao();
            const result = await userDao.saveUser(user);


            if (result === true) {
                return "registered";
            }

        } catch (error) {
            return Promise.reject(error.toString());
        }
    }

    static async handleLogin(req: Express.Request) {

        try {
            const userDao = new UserDao();
            const validator = new UserValidator();
            const parser: UserParser = new UserParser();
            const formErrors: FormErrors = new FormErrors();

            const errors = validator.isValidLogin(req);

            if (errors.size()) {
                return Promise.reject(errors);
            }

            const result = await userDao.getUserByUsername(req.body.userName);

            if (result.length === 0) {
                formErrors.forField("userName", "Username not register")
                return Promise.reject(formErrors);
            }
            const user = parser.fromSqlResult(result);

            const isValidPassword = validator.isValidPassword(req.body.password, user);

            if (isValidPassword === false) {
                formErrors.forField("password", "Invalid password")
                return Promise.reject(formErrors);
            }

            if (!req.session) {
                return Promise.reject(new Error("there is no session active"));
            }

            req.session.userId = user.getId();

            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error.toString());
        }

    }

    static async handleFacebookLogin(req: any, res: any) {
        try {
            const userDao = new UserDao();
            const parser: UserParser = new UserParser();
            const formErrors: FormErrors = new FormErrors();            

            const result = await userDao.getUserByEmail(res.email);
            if (result.length > 0) {
                formErrors.forField("userName", "This email is already register")
                return Promise.reject(formErrors);
            }
            const user = parser.fromFacebookResponse(res);

            userDao.saveUser(user);

            if (!req.session) {
                return Promise.reject(new Error("there is no session active"));
            }

            req.session.userId = user.getId();

            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error.toString());
        }

    }
}
}