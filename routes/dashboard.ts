var express = require('express');
var router = express.Router();
import {format} from "url";


/* GET home page. */
router.get('/', requiresLogin, function(req, res, next) {
  res.render('dashboard', { title: 'Express', user: req.app.get("current_user") });
});

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
      return next();
    } else {
        res.redirect(format({
            pathname:"/login",
            query: {
               "error":"not_log"
             }
          }));
    }
  }

module.exports = router;