import { Router } from 'express';
import { login } from '../controllers/authController';


const router = Router();

// 👉 Validación + ruta de registro


// 👉 Ruta de login (puede ir sin validación aquí si ya la tienes en el controlador)
router.post('/login', login);

export default router;
