const bcrypt = require("bcryptjs");
const db = require("../config/db");

async function createUsuario(req, res) {

  try {

    const { username, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (username, password) VALUES ($1,$2)",
      [username, hash]
    );

    res.json({
      success: true,
      message: "Usuario creado"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error creando usuario"
    });

  }

}

module.exports = {
  createUsuario
};