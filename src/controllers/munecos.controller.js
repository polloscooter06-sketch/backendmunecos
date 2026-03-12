const service = require("../services/munecos.service");
const AppError = require("../utils/AppError");
const db = require("../config/db");

async function getHerramientas(req, res, next) {
  try {
    const data = await service.getAll();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

async function createHerramienta(req, res) {
  try {
    

    const {
      numero_base,
      figura,
      estado,
      localidad,
      direccion,
      negocio,
      cliente,
      cc,
      telefono
    } = req.body;
    console.log(req.body);

    await db.query(
      `INSERT INTO munecos
      (numero_base, figura, estado, localidad, direccion, negocio, cliente, cc, telefono)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [numero_base, figura, estado, localidad, direccion, negocio, cliente, cc, telefono]
    );

    res.json({ success: true });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false, message:"Error creando figura" });
  }
}

async function changeEstado(req, res, next) {
  try {

    const {
      estado,
      localidad,
      direccion,
      negocio,
      cliente,
      cc,
      telefono,
      pendientes

    } = req.body;

    if (estado === "ALQUILER") {

      await db.query(
        `UPDATE munecos
         SET estado = $1,
             localidad = $2,
             direccion = $3,
             negocio = $4,
             cliente = $5,
             cc = $6,
             telefono = $7
         WHERE id = $8`,
        [estado, localidad, direccion, negocio, cliente, cc, telefono, req.params.id]
      );

    }else if(estado === "MANTENIMIENTO"){
      await db.query(
        `UPDATE munecos
         SET estado = $1,
            pendientes = $2
         WHERE id = $3`,
        [estado, pendientes, req.params.id]
      );

    } else {

      await db.query(
        `UPDATE munecos
         SET estado = $1,
             localidad = NULL,
             direccion = NULL,
             negocio = NULL,
             cliente = NULL,
             cc = NULL,
             telefono = NULL,
             pendientes=NULL
         WHERE id = $2`,
        [estado, req.params.id]
      );
    }

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error actualizando estado" });
  }
}

async function registerRecaudo(req, res, next) {
  try {
    const { id } = req.params;
    const data = await service.updateRecaudo(id);

    if (!data) {
      throw new AppError("Herramienta no encontrada", 404);
    }

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getHerramientas,
  createHerramienta,
  changeEstado,
  registerRecaudo
};

const pool = require("../config/db");

exports.getHerramientas = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM munecos');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};