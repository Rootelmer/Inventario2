import { Schema, model } from 'mongoose';

export interface IRol {
  nombre: string;
  permisos: string[];
}

const rolSchema = new Schema<IRol>({
  nombre: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  permisos: { 
    type: [String], 
    default: [],
    validate: {
      validator: (permisos: string[]) => {
        const validPermisos = [
          'categorias',
          'productos',
          'proveedores',
          'entradas',
          'salidas',
          'roles',
          'usuarios',
          'reportes',
          'cambiarContrasena'
        ];
        return permisos.every(p => validPermisos.includes(p));
      },
      message: 'Uno o más permisos no son válidos'
    }
  }
});

// Add index for better performance on queries
rolSchema.index({ nombre1: 1 });

export const Rol = model<IRol>('Rol', rolSchema);