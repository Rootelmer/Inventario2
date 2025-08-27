import { Response } from 'express';
import { Error } from 'mongoose';
import { MongoError } from 'mongodb';

export const handleHttpError = (res: Response, message: string, error: unknown) => {
  console.error(message, error);
  
  if (error instanceof Error.ValidationError) {
    return res.status(400).json({
      message: 'Error de validación',
      errors: error.errors
    });
  }
  
  if (error instanceof MongoError && error.code === 11000) {
    return res.status(400).json({
      message: 'Error de duplicado',
      details: 'El nombre del rol ya existe'
    });
  }
  
  res.status(500).json({
    message: message || 'Error interno del servidor'
  });
};