const pool = require("../config/db");

async function getAll() {
  const result = await pool.query(
    "SELECT * FROM munecos ORDER BY id DESC"
  );
  return result.rows;
}

async function create(data) {
  const {
    numero_base,
    figura,
    estado,
    localidad,
    direccion,
    negocio,
    cliente,
    cc,
    telefono,
    porcentaje,
    pendientes
  } = data;

  const result = await pool.query(
    `INSERT INTO munecos
    (numero_base, figura, estado, localidad, direccion, negocio, cliente, cc, telefono, porcentaje, pendientes)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *`,
    [
      numero_base,
      figura,
      estado || "STOCK",
      localidad || null,
      direccion || null,
      negocio || null,
      cliente || null,
      cc || null,
      telefono || null,
      porcentaje || null,
      pendientes || null
    ]
  );

  return result.rows[0];
}

async function updateEstado(id, estado) {
  const result = await pool.query(
    `UPDATE munecos
     SET estado = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [estado, id]
  );
  return result.rows[0];
}

async function updateRecaudo(id) {
  const result = await pool.query(
    `UPDATE munecos
     SET ultimo_recaudo = NOW(), updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
}

module.exports = {
  getAll,
  create,
  updateEstado,
  updateRecaudo
};