const express = require("express");
const controller = require("../controllers/munecos.controller");
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { createHerramientaSchema } = require("../validators/herramientas.validator");

const router = express.Router();

// 🔐 Protegidas con token
router.get("/", auth, controller.getHerramientas);

router.post(
  "/",
  auth,
  validate(createHerramientaSchema),
  controller.createHerramienta
);
router.put("/:id/estado", auth, controller.changeEstado);
router.put("/:id/recaudo", auth, controller.registerRecaudo);

module.exports = router;