import * as express from "express";
import { format } from "url";
import UserController from "../src/user/UserController";
import { upload } from "../src/formHelper/FileUpload";
import { api } from "fb";
import { ExpressError } from "../src/system/errors/ErrorType";
import FormErrors from "../src/system/errors/FormErrors";

var app = require('../app');
type expressData = { title: string, errors?: ExpressError };

var router = express.Router();

router.get('/', function (req, res, next) {
  let data: expressData = { title: 'Loging', errors: { formErrors: undefined, systemErrors: undefined } }
  const formErrors = req.app.get('form_errors');
  const systemErrors = req.app.get('system_errors');

  if (formErrors) {
    data = { title: 'Loging', errors: { formErrors, systemErrors } }
    req.app.set("form_errors", undefined)
  }

  if (systemErrors) {
    data = { title: 'Loging', errors: { formErrors, systemErrors } }
    req.app.set("system_errors", undefined)
  }

  res.render('login', data);
});

router.get('/facebook', function (req, resExpress, next) {
  api('me?fields=id,name,email,picture', { access_token: req.param("token") }, async function (res) {
    if (!res || res.error) {
      console.log(!res ? 'error occurred' : res.error);
      return;
    }

    try {
      const user = await UserController.handleFacebookLogin(req, res);
      req.app.set("current_user", user)
      resExpress.redirect('/dashboard');
    } catch (error) {
      req.app.set("form_errors", error);
      resExpress.redirect('/login');
    }

  });

})


router.get('/singup', function (req, res, next) {
  let data: expressData = { title: 'register', errors: { formErrors: undefined } }
  const formErrors = req.app.get('form_errors');
  const systemErrors = req.app.get('system_errors');


  if (formErrors) {
    data = { title: 'register', errors: { formErrors, systemErrors } }
    req.app.set("form_errors", undefined)
  }

  if (systemErrors) {
    data = { title: 'Loging', errors: { formErrors, systemErrors } }
    req.app.set("system_errors", undefined)
  }

  res.render('register', data);  
});

router.post('/singup', async function (req, res, next) {
  try {
    let ok = await UserController.handleSignUpForm(req, res);

    res.redirect(format({
      pathname: "/login",
      query: {
        "valid": "login succes"
      }
    }));
  } catch (error) {
    if (error instanceof FormErrors) {
      req.app.set("form_errors", error)
    } else {
      req.app.set("system_errors", `Database error ${error}`)
    }
    res.redirect("singup");
  }
});

router.post('/singin', async function (req, res, next) {
  try {
    const user = await UserController.handleLogin(req);
    req.app.set("current_user", user)
    res.redirect("/dashboard");
  } catch (error) {

    if (error instanceof FormErrors) {
      req.app.set("form_errors", error)
    } else {
      req.app.set("system_errors", `Database error ${error}`)
    }
    res.redirect("/login");
  }
});

router.get('/logout', async function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        req.app.set("current_user", undefined)
        return res.redirect('/login');
      }
    });
  }
});

module.exports = router;
