const jwt = require("jsonwebtoken");
const userQueries = require("../queries/user.queries");

// Pour être sur que l'utilistateur est connecté

exports.authenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoToken = jwt.verify(
      token,
      "j4wijDRbSvePYSVTibirnTp3oWmlanOInyl1rAukGG55uEz234gIXWatrNqghnEoxtJPlh69"
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