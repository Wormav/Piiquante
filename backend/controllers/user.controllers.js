const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userQueries = require("../queries/user.queries");

// Crée un nouvelle utilisateur

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await userQueries.createUser(req.body.email, hashedPassword);
    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
};

// Connect l'utilisateur et crée un token

exports.login = async (req, res) => {
    try {
      const user = await userQueries.findUserByEmail(req.body.email);
      if (!user) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
  
      const passwordIsValid = await bcrypt.compare(req.body.password, user.password)
        
        
      if (!passwordIsValid) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
  
      return res.status(200).json({
        userId: user._id.toString(),
        token: jwt.sign(
            { userId: user._id },
            "j4wijDRbSvePYSVTibirnTp3oWmlanOInyl1rAukGG55uEz234gIXWatrNqghnEoxtJPlh69",
            { expiresIn: "24h" }
          ),
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
