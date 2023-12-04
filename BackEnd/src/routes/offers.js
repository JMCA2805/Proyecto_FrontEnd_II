var express = require("express");
var router = express.Router();
const controller = require("../controllers/offers-c.js");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", controller.getOffers);
router.post("/addoff", upload.single("icono"), controller.addoff);
router.put("/editoff", upload.single("icono"), controller.editoff);
router.delete('/deloff', controller.deloff);

module.exports = router;
