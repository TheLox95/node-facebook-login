"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
const url_1 = require("url");
/* GET home page. */
router.get('/', requiresLogin, function (req, res, next) {
    res.render('dashboard', { title: 'Express', user: req.app.get("current_user") });
});
function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    }
    else {
        res.redirect(url_1.format({
            pathname: "/login",
            query: {
                "error": "not_log"
            }
        }));
    }
}
module.exports = router;
