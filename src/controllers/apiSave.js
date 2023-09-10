const axios = require("axios");
const { Personajes } = require("../database");

const getApiData = async () => {
  try {
    const totalPages = 5;
    const characters = [];

    for (let i = 1; i <= totalPages; i++) {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${i}`
      );
      const data = response.data.results.map((char) => ({
        id: char.id,
        name: char.name,
        status: char.status,
        species: char.species,
        gender: char.gender,
        origin: char.origin.name,
        image: char.image,
      }));
      characters.push(...data);
    }

    return characters;
  } catch (error) {
    console.log(error)
    return { error: error.message };
  }
};

const saveApiData = async () => {
  try {
    const personajes = await getApiData();
    await Personajes.bulkCreate(personajes);

    return personajes;
  } catch (error) {
    console.error('Error al guardar en la base de datos: ', error);
    return { error: error.message };
  }
};

module.exports = {
  saveApiData,
};
