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
const express = require("express");
const url_1 = require("url");
const UserController_1 = require("../src/user/UserController");
const fb_1 = require("fb");
var app = require('../app');
var router = express.Router();
router.get('/', function (req, res, next) {
    const formErrors = req.app.get('form_errors');
    let data = { title: 'Loging' };
    if (formErrors) {
        data = { title: 'Loging', formErrors };
        req.app.set("form_errors", undefined);
    }
    console.log(data);
    res.render('login', data);
});
router.get('/facebook', function (req, resExpress, next) {
    fb_1.api('me?fields=id,name,email,picture', { access_token: req.param("token") }, function (res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }
            try {
                const user = yield UserController_1.default.handleFacebookLogin(req, res);
                req.app.set("current_user", user);
                resExpress.redirect('/dashboard');
            }
            catch (error) {
                req.app.set("form_errors", error);
                resExpress.redirect('/login');
            }
        });
    });
});
router.get('/singup', function (req, res, next) {
    const formErrors = req.app.get('form_errors');
    let data = { title: 'register' };
    if (formErrors) {
        data = { title: 'register', formErrors };
        req.app.set("form_errors", undefined);
    }
    res.render('register', data);
});
router.post('/singup', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let ok = yield UserController_1.default.handleSignUpForm(req, res);
            res.redirect(url_1.format({
                pathname: "/login",
                query: {
                    "valid": "login succes"
                }
            }));
        }
        catch (error) {
            req.app.set("form_errors", error);
            res.redirect("singup");
        }
    });
});
router.post('/singin', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield UserController_1.default.handleLogin(req);
            req.app.set("current_user", user);
            res.redirect("/dashboard");
        }
        catch (error) {
            req.app.set("form_errors", error);
            res.redirect("/login");
        }
    });
});
router.get('/logout', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.session) {
            // delete session object
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                }
                else {
                    req.app.set("current_user", undefined);
                    return res.redirect('/login');
                }
            });
        }
    });
});
module.exports = router;
