const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Schema pour la base de données

const userSchema = mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

// utilise mongoose-unique-validator

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
