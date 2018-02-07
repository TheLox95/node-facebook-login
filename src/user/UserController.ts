import UserValidator from "./UserValidator";
import User from "./User";
import UserParser from "./UserParser";
import UserDao from "./UserDao";
import handleImageUpload from "../formHelper/FileUpload";


export default class UserController {

    static async handleSignUpForm(req: Express.Request, res) {
        try {
            let validator: UserValidator = new UserValidator();
            let parser: UserParser = new UserParser();

            const errors = validator.isValidRegister(req);
            if (errors.size > 0) {
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
            return Promise.reject(error);
        }
    }

    static async handleLogin(req: Express.Request) {

        try {
            const userDao = new UserDao();
            const validator = new UserValidator();
            const parser: UserParser = new UserParser();

            const errors = validator.isValidLogin(req);

            if (errors.size > 0) {
                return Promise.reject(errors);
            }

            const result = await userDao.getUserByUsername(req.body.userName);

            if (result.length === 0) {
                return Promise.reject((new Map()).set("userName", "Username not register"));
            }
            const user = parser.fromSqlResult(result);

            const isValidPassword = validator.isValidPassword(req.body.password, user);

            if (isValidPassword === false) {
                return Promise.reject((new Map()).set("password", "Invalid password"));
            }

            if (!req.session) {
                return Promise.reject(new Error("there is no session active"));
            }

            req.session.userId = user.getId();

            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error);
        }

    }

    static async handleFacebookLogin(req: any, res: any) {
        try {
            const userDao = new UserDao();
            const parser: UserParser = new UserParser();

            const result = await userDao.getUserByEmail(res.email);
            if (result.length > 0) {
                return Promise.reject((new Map()).set("userName", "This email is already register"));
            }
            const user = parser.fromFacebookResponse(res);

            userDao.saveUser(user);

            if (!req.session) {
                return Promise.reject(new Error("there is no session active"));
            }

            req.session.userId = user.getId();

            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error);
        }

    }
}
}