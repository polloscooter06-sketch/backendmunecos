const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const { jwtSecret, jwtExpires } = require("../config/auth");

async function login(req, res) {
  const { username, password } = req.body;

  try {
    // 1️⃣ Buscar usuario en Neon
    const result = await pool.query(
      "SELECT * FROM users WHERE LOWER(username) = LOWER($1)",
      [username]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas"
      });
    }

    const user = result.rows[0];

    // 2️⃣ Comparar contraseña real con hash guardado
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas"
      });
    }

    // 3️⃣ Crear token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      jwtSecret,
      { expiresIn: jwtExpires }
    );

    res.json({
      success: true,
      token
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
}

module.exports = { login };