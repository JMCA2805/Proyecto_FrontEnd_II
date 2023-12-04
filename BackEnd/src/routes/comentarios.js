const express = require("express");
const router = express.Router();
const {agregarComentario,getComentario} = require('../controllers/comentarios.js')


router.post("/add", agregarComentario)
router.get("/get", getComentario)



module.exports = router;