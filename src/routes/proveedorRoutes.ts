import express from 'express';
import { createProveedor, deleteProveedor, getProveedores, updateProveedor } from '../controllers/proveedorController';

const router = express.Router();

router.get('/', getProveedores);
router.post('/', createProveedor);
router.put('/:id', updateProveedor);
router.delete('/:id', deleteProveedor);

export default router;
