import { Router } from 'express';
import {
  obtenerRoles,
  crearRol,
  actualizarPermisos,
  eliminarRol
} from '../controllers/rol.controller';
import { validateRequest } from '../middleware/validateRequest';
import { body } from 'express-validator';

const router = Router();

router.get('/', obtenerRoles);

router.post(
  '/',
  [
    body('nombre').isString().trim().isLength({ min: 3 }),
    body('permisos').optional().isArray()
  ],
  validateRequest,
  crearRol
);

router.put(
  '/:id/permisos',
  [
    body('permisos').isArray(),
    body('permisos.*').isString()
  ],
  validateRequest,
  actualizarPermisos
);

router.delete('/:id', eliminarRol);

export default router;