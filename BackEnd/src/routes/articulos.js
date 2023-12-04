const express = require("express");
const router = express.Router();
const controller = require('../controllers/blog-c.js');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res) => {
    controller.obtenerArticulos(req, res);
});

router.post('/add', upload.single('imagen'), (req, res) => {
    controller.agregarArticulo(req, res);
});

router.delete('/delete', (req, res) => {
  controller.eliminarArticulo(req, res);
});

router.put('/update', upload.single('imagen'), (req, res) => {
  controller.editarArticulo(req, res);
});




module.exports = router;
