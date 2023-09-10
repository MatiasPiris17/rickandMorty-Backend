const router = require("express").Router();
const { Personajes } = require("../database");

router.get("/", async (req, res) => {
  try {
    const personajes = await Personajes.findAll();
    res.status(200).json(personajes);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const personaje = await Personajes.findByPk(id)

    if (personaje === null) {
      return res.status(400).json({ message: "Personaje no encontrado" });
    }
    res.status(200).json(personaje);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});


module.exports = router;
