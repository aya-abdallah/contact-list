const express = require("express");
const contactRouter = express.Router();
const Contact = require("../../models/contacts");

contactRouter.get("/getList", (req, res) => {
  //   console.log("user_id = ", req.cookies.userId );
  Contact.find({ userId: req.cookies.userId }).then(contacts =>
    res.json(contacts)
  );
});

contactRouter.get("/getRecentList", (req, res) => {
  //   console.log("user_id = ", req.cookies.userId );
  Contact.find({ userId: req.cookies.userId }).then(contacts => {
    if (contacts.length <= 5) res.json(contacts);
    else {
      const recent = contacts.slice(Math.max(contacts.length - 5, 1));
      res.json(recent);
    }
  });
});

contactRouter.post("/addContact", (req, res) => {
  if (req.cookies === undefined || req.cookies.userId === undefined) {
    res.status(400).send("you must login with email and password");
  } else {
    console.log("cookies = ", req.cookies);
    const newContact = new Contact({
      // userId: req.body.userId,
      userId: req.cookies.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile
    });
    newContact
      .save()
      .then(data => {
        console.log("data saved ", data);
        res.json(data);
      })
      .catch(err => res.status(400).send("unable to save to database"));
  }
});

contactRouter.delete("/", (req, res) => {
  Contact.findOneAndDelete({ _id: req.query.id }).then(contact => {
    res.json(contact);
  });
});

module.exports = contactRouter;
