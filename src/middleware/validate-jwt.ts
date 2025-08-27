import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  uid?: string;
}

export const validateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-token');
  
  if (!token) {
    return res.status(401).json({
      message: 'No hay token en la petición'
    });
  }
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || '') as { uid: string };
    req.uid = payload.uid;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: 'Token no válido'
    });
  }
};