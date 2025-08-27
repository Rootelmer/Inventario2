import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware'; // CORRECTO

import {
  crearProducto,
  obtenerProductos,
  eliminarProducto,
  editarProducto
} from '../controllers/producto.controller';
import { obtenerProductosPorCategoria } from '../controllers/producto.controller';

const router = Router();

router.post('/productos', crearProducto);
router.get('/productos', obtenerProductos);
router.delete('/productos/:id', eliminarProducto);
router.put('/productos/:id', editarProducto);
//router.post('/productos', verificarToken, crearProducto);
router.get('/productos/categoria/:categoriaId', obtenerProductosPorCategoria);
router.get('/', authMiddleware, obtenerProductos);
router.post('/', authMiddleware, crearProducto);
export default router;
