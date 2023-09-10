const router = require('express').Router();
const personajes = require('./personajes')
const favoritos = require('./favoritos')

router.use('/personajes', personajes);

router.use('/favoritos', favoritos);

module.exports = router;