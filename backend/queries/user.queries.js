const User = require("../models/user.model");

// sauvegarde le nouvelle utilisateur dans la database

exports.createUser = (email, hashedPassword) => {
  const newUser = new User({ email: email, password: hashedPassword });
  return newUser.save();
};

// Trouve un utilisateur avec un email

exports.findUserByEmail = (email) => User.findOne({ email }).exec();

// Trouve un utilisateur avec son Id

exports.findUserById = (id) => User.findOne({_id : id}).exec()
