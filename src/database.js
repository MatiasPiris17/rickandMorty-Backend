const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Local
// const sequelize = new Sequelize(
//   `postgres://postgres:42875917k@localhost:5432/rickandmorty`,
//   {
//     logging: false,
//     native: false,
//   }
// );

//  Deploy
const sequelize = new Sequelize(
  `postgres://rickandmorydb_user:UwLtcqfORV3vrExUHVMDD5Dc1CspipPK@dpg-cjv2moh5mpss738tcvlg-a/rickandmorydb`,
  {
    logging: false,
    native: false,
  }
);


const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Modelos
const {Personajes, Favoritos} = sequelize.models;

// Relacion de tablas


// module.exports = { ...sequelize.models, conn: sequelize };
module.exports = { sequelize, ...sequelize.models };

