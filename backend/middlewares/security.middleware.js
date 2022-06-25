const jwt = require("jsonwebtoken");
const userQueries = require("../queries/user.queries");
const sauceQueries = require("../queries/sauce.queries");
const envDev = require("../environment/development");

// Pour être sur que l'utilistateur est connecté

exports.authenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoToken = jwt.verify(
      token,
      envDev.jwtSecret
    );
    const user = await userQueries.findUserById(decoToken.userId);
    if (!user)
      return res.status(401).json({ message: "Error token identification" });
    req.user = user;
    req.authenticated = true;
    return next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// vérifie que l'utilisateur est propriétaire de la sauce pour la modifer

exports.ensureUserIsOwerOfTheSauce = async (req , res , next ) => {
  try {
    const userId = req.user._id.toString()
    const sauceId = req.params._id
    const sauceObj = await sauceQueries.findSauceById(sauceId);

    if (!sauceObj) {
      return res.status(404).json({ message: `Sauce n'on trouvé`})
    } else if (userId !== sauceObj.userId) {
      return res.status(403).json({ message: `Vous n'êtes pas l'auteur de cette sauce`})
    } else {
      next()
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}