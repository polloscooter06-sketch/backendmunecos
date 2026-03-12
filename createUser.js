// createUser.js
require("dotenv").config(); 
const bcrypt = require("bcryptjs");
const pool = require("./src/config/db");

async function run() {
  const hash = await bcrypt.hash("Diver1015@", 10);

  await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2)",
    ["Divermoviles", hash]
  );

  console.log("Usuario creado en Neon 🚀");
  process.exit();
}

run();