var express = require('express');
var router = express.Router();
const controller = require('../controllers/carrito-c.js');

router.get("/:id", controller.consultarCarrito)

router.post("/", controller.agregarCompraCarrito)

module.exports = router;
