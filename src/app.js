const express = require("express");
const cors = require("cors");
const path = require("path")

const herramientasRoutes = require("./routes/munecos.routes");
const errorHandler = require("./middleware/error.middleware");
const authRoutes = require("./routes/auth.routes");
const usuariosRoutes = require("./routes/usuarios.routes");


const app = express();


app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/herramientas", herramientasRoutes);
app.use("/usuarios", usuariosRoutes);
app.use(errorHandler);

module.exports = app;