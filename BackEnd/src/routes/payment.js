var express = require('express');
var router = express.Router();
const controller = require('../controllers/payment-c.js');

router.post("/", controller.agregarPago)

module.exports = router;
