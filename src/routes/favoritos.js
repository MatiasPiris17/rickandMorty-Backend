const router = require("express").Router();
const { Favoritos, Personajes } = require("../database");

router.get("/", async (req, res) => {
  try {
    const favoritos = await Favoritos.findAll();

    res.status(200).json(favoritos);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// ID del personaje que quieras que sea tu favorito
router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const personaje = await Personajes.findByPk(id);
    const personajeFav = {
      name: personaje.name,
      status: personaje.status,
      species: personaje.species,
      gender: personaje.gender,
      origin: personaje.origin,
      image: personaje.image,
    };

    const pers_fav = await Favoritos.create(personajeFav);
    res.status(200).send(personajeFav);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const personaje = await Favoritos.findByPk(id);
    if (!personaje) {
      return res.status(404).send("El personaje no está en favoritos");
    }
    
    await Favoritos.destroy({
      where: {
        id: personaje.id
      }
    });

    res.status(200).json({ message: "Personaje eliminado de favoritos" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error al eliminar el personaje de favoritos");
  }
});

module.exports = router;
