const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});
const Contacts = mongoose.model("Contact", contactSchema);
module.exports = Contacts;
