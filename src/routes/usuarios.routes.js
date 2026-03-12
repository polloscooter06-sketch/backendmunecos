const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuarios.controller");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, usuariosController.createUsuario);

module.exports = router;