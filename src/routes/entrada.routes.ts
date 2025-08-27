import { Router } from 'express';
import mongoose from 'mongoose';
import {
  crearEntrada,
  obtenerEntradas,
  actualizarEntrada,
  eliminarEntrada
} from '../controllers/entrada.controller';
import Entrada from '../models/Entrada'; // Import necesario para la agregación

const router = Router();

// Rutas existentes
router.post('/', crearEntrada);
router.get('/', obtenerEntradas);
router.put('/:id', actualizarEntrada);
router.delete('/:id', eliminarEntrada);

// Nueva ruta: obtener existencia total de un producto
router.get('/existencia-total/:productoId', async (req, res) => {
  try {
    const { productoId } = req.params;

    const resultado = await Entrada.aggregate([
      { $match: { producto: new mongoose.Types.ObjectId(productoId) } },
      { $group: { _id: null, total: { $sum: "$existenciaActual" } } }
    ]);

    const existenciaTotal = resultado.length > 0 ? resultado[0].total : 0;
    res.json({ existenciaTotal });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
