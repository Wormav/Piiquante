const sauceQueries = require("../queries/sauce.queries");

exports.likeSauce = async (req, res) => {
  try {
    // const
    const likeRequest = req.body.like;
    const sauceId = req.params.id;
    const userId = req.user._id.toString()
    const sauceObj = await sauceQueries.findSauceById(sauceId);
    
    const usersWhoLiked = sauceObj.usersLiked.includes(userId);
    const usersWhoDisliked = sauceObj.usersDisliked.includes(userId);
    let update = {};
    let message = "";

    
    if (likeRequest < -1 || likeRequest > 1)
      return res.status(400).json({ message: "Valeur likes invalide" });

    // add like

    if (likeRequest === 1 && !usersWhoLiked) {
      update = {
        $addToSet: { usersLiked: userId },
        $pull: { usersDisliked: userId },
        $inc: {
          likes: 1,
          dislikes: usersWhoDisliked ? -1 : 0,
        },
      };
      message = `Like ajouté à ${sauceObj.name}`;

      // add dislike
    } else if (likeRequest === -1 && !usersWhoDisliked) {
      update = {
        $addToSet: { usersDisliked: userId },
        $pull: { usersLiked: userId },
        $inc: {
          dislikes: 1,
          likes: usersWhoLiked ? -1 : 0,
        },
      };
      message = `Dislike ajoué à ${sauceObj.name}`;

      // retire like ou dislike
    } else if (likeRequest === 0) {
      update = {
        $pull: { usersLiked: userId, usersDisliked: userId },
        $inc: {
          likes: usersWhoLiked ? -1 : 0,
          dislikes: usersWhoDisliked ? -1 : 0,
        },
      };
      message = "requête prise en compte";

      // erreur si déja fait
    } else {
      return res
        .status(400)
        .json({
          message: ` Vous avez déja ${
            usersWhoLiked ? "liké" : "disliké"
          } la sauce`,
        });
    }
    await sauceQueries.updateSauceById(sauceId, update);
    return res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};