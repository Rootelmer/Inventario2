import { Router } from 'express';
import { listarServicios, crearServicio, actualizarServicio, eliminarServicio } from '../controllers/servicios.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, listarServicios);
router.post('/', authMiddleware, crearServicio);
router.put('/:id', authMiddleware, actualizarServicio);
router.delete('/:id', authMiddleware, eliminarServicio);

export default router;
