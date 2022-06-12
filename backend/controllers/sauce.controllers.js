const saucesQueries = require('../queries/sauce.queries')

exports.getAllSauces = async (req, res, next) => {
  try {
    const allSauces = await saucesQueries.findAllSauces();
    return res.status(200).json(allSauces);
  } catch (e) {
    next(e)
  }
};

exports.getOneSauce = async (req, res, next) => {
  try {
    const sauceId = req.params.id;
    const sauce = await saucesQueries.findSauceById(sauceId);
    if (!sauce) return res.status(404).json({ message: 'Sauce non trouvé' });
    return res.status(200).json(sauce);
  } catch (e) {
    next(e)
  }
};

exports.createSauce = async (req, res, next) => {
  try {
    const imgUrl = 'https://pixabay.com/fr/vectors/relier-lien-hypertexte-cha%c3%aene-6931554/';
    const sauce = {
      ...JSON.parse(req.body.sauce),
      imgUrl,
      userId: req.user._id,
    }
    await saucesQueries.addSauce(sauce);
    res.status(201).json({message: 'Sauce ajouté !'})
  } catch (e) {
    next(e)
  }
};
