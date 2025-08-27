import { Router } from 'express';
import {
  crearSalida,
  obtenerSalidas,
  actualizarSalida,
  eliminarSalida,
  obtenerSugerenciasProductos,
  obtenerPrecioVenta,
  verificarExistencia,
  obtenerEntradasProducto,
  actualizarExistencia
} from '../controllers/salida.controller';
import Salida from '../models/Salida';

const router = Router();

// CRUD de salidas
router.post('/', crearSalida);
router.get('/', obtenerSalidas);
router.put('/:id', actualizarSalida);
router.delete('/:id', eliminarSalida);

// Autocompletado y precios
router.get('/sugerencias/productos', obtenerSugerenciasProductos);
router.get('/precio-venta/:productoId', obtenerPrecioVenta);

// Verificar existencia de un producto
router.get('/verificar-existencia/:productoId', verificarExistencia);

// Obtener entradas de un producto (para FIFO)
router.get('/entradas-producto/:productoId', obtenerEntradasProducto);

// Actualizar existencia (FIFO)
router.put('/actualizar-existencia/:productoId', actualizarExistencia);

// Obtener el último número de factura
router.get('/ultimo-numero-factura', async (req, res) => {
  try {
    const ultima = await Salida.findOne().sort({ numeroFactura: -1 });

    if (!ultima) {
      return res.json({ numeroFactura: 'F0001' });
    }

    const ultimoNumero = ultima.numeroFactura.replace('F', '');
    const nuevoNumero = parseInt(ultimoNumero) + 1;
    const numeroFormateado = 'F' + String(nuevoNumero).padStart(4, '0');

    res.json({ numeroFactura: numeroFormateado });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el último número' });
  }
});

export default router;
