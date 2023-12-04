const express = require("express");
const router = express.Router();
const {agregarReseña, agregarReseñaArticulo, filReseñaProd, filReseñaArt} = require('../controllers/reseñas.js')


router.post("/add", agregarReseña)
router.post("/addart", agregarReseñaArticulo)
router.post("/getResProd", filReseñaProd)
router.post("/getResArt", filReseñaArt)



module.exports = router;