// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  rol?: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;

    if (!token) {
      return res.status(401).json({ message: 'Token requerido' });
    }

    // Usar la misma clave secreta que en login
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto') as JwtPayload;

    // Guardar info del usuario en la request
    (req as any).user = { id: decoded.userId, rol: decoded.rol || null };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
