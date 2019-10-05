const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const auth = require("../auth");
const User = require("../../models/users");

router.post("/", auth.optional, (req, res, next) => {
  //   const { body: { user } } = req;
  console.log("body === ", req.body);
  const user = req.body;
  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  const finalUser = new User(user);

  finalUser.setPassword(user.password);

  return finalUser
    .save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

router.post("/login", auth.optional, (req, res, next) => {
    const user = req.body;

  if (!user.email) {
    return res.json({
      errors: {
        email: " is required"
      }
    });
  }

  if (!user.password) {
    return res.json({
      errors: {
        password: " is required"
      }
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        res.cookie('userId',user._id);
        return res.json({ user: user.toAuthJSON() });
      }

      return res.json({
        errors: {
          Invalid: " email or password"
        }
      });
    }
  )(req, res, next);
});

router.get("/current", auth.required, (req, res, next) => {
  const {
    payload: { id }
  } = req;

  return User.findById(id).then(user => {
    if (!user) {
      return res.sendStatus(400);
    }

    return res.json({ user: user.toAuthJSON() });
  });
});

module.exports = router;