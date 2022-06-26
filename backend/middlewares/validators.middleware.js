const fs = require("fs");
const { body, validationResult } = require("express-validator");

// regarde et gére les erreurs returner par express-validator et les renvoie à l'utilisateur

const checkIfErrors = (req , res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        let errorMessage = '';
        errors.errors.forEach((error) => {
            errorMessage += `${error.msg}.`
        });
        return res.status(400).json({ message: errorMessage })
    }
    return next()
}

// valide et verifie si les champs de l'insciption sont bien remplie

exports.signupValidator = [
  body("email")
    .isEmail()
    .withMessage(`L'adresse email saisi n'est pas au bon format`),
  body("password")
    .isStrongPassword({
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Le mot de passe doit contenir au minimum 10 caractères , une majuscule , une minuscule, un chiffre et un caractère spécial"
    ),
  (req, res, next) => {
    checkIfErrors(req, res, next);
  },
];
