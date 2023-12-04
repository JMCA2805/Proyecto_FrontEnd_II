const express = require("express");
const router = express.Router();
const register = require("../controllers/register.js");
const getUserById = require("../controllers/getUserById.js");
const login = require("../controllers/login.js");
const verifyToken = require("../middlewares/verifytoken.js");
const controller = require("../controllers/user-c.js");
const passController = require("../controllers/password.js");
const decodetoken = require("../middlewares/decodetoken");

const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", upload.single("imagen"), register);

router.get("/decode", decodetoken);

router.get("/users", controller.obtenerUsuarios);

router.put("/users/editar/", (req, res) => {
  controller.editarUsuario(req, res);
});

router.post("/users/editar/:id", (req, res) => {
  controller.editarUsuarioPerfil(req, res);
});

router.post("/login", login);

router.delete("/eliminarUsuario", (req, res) => {
  controller.eliminarUsuario(req, res);
});

router.post("/users/:id", upload.single("imagen"), (req, res) => {
  controller.editarFoto(req, res);
});

router.get("/usuarioObtenido/:id", (req, res) => {
  getUserById(req, res);
});

router.get("/users/:id", controller.obtenerUsuariosId);

router.post("/editUser", passController.change);

module.exports = router;
