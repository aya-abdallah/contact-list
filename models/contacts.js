const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }]
});
const Contacts = mongoose.model("Todo", contactSchema);
module.exports = Contacts;
