var express = require('express');
var router = express.Router();
const path = require('path');
const controller = require('../controllers/productos');
const favorito = require('../controllers/favorito')

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/productos/:id', (req, res) => {
  controller.obtenerProductos(req, res);
});

router.get('/productos', (req, res) => {
  controller.obtenerProductos(req, res);
});

router.post('/productos', upload.single('imagen'), (req, res) => {
  controller.agregarProductos(req, res);
});

router.post('/productos/:id', (req, res) => {
  controller.agregarCarrito(req, res);
});

router.delete('/productos', (req, res) => {
  controller.eliminarProducto(req, res);
});

router.put('/productos', upload.single('imagen'), (req, res) => {
  controller.editarProducto(req, res);
});


router.post('/favorito/', (req, res) => {
  favorito.Add_Fav(req, res);
});
router.get('/favorito/:user_id', (req, res) => {
  favorito.Fav_List(req, res);
});

router.delete('/favorito', (req, res) => {
  favorito.Del_Fav(req, res);
});


module.exports = router;
