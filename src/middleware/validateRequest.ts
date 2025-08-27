import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
//import { CustomError } from '../errors/custom-error'; // Opcional: para errores personalizados

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Si usas CustomError (opcional)
    // throw new RequestValidationError(errors.array());
    
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
       // param: err.param,
        message: err.msg,
        //value: err.value
      }))
    });
  }

  next();
};