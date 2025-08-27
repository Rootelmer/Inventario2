import { Request, Response } from 'express';
import { Rol } from '../models/Rol';

export const obtenerRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await Rol.find().sort({ nombre: 1 }); // Sort alphabetically
    res.json(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({ 
      message: 'Error al obtener los roles',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

export const crearRol = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    
    // Validation
    if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 3) {
      return res.status(400).json({ message: 'El nombre del rol debe tener al menos 3 caracteres' });
    }

    // Check for existing role
    const existeRol = await Rol.findOne({ nombre });
    if (existeRol) {
      return res.status(400).json({ message: 'Ya existe un rol con este nombre' });
    }

    const nuevoRol = new Rol({ nombre });
    await nuevoRol.save();
    res.status(201).json(nuevoRol);
  } catch (error) {
    console.error('Error al crear rol:', error);
    res.status(500).json({ 
      message: 'Error al crear el rol',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

export const actualizarPermisos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { permisos } = req.body;

    // Validate permissions array
    if (!Array.isArray(permisos)) {
      return res.status(400).json({ message: 'Los permisos deben ser un array' });
    }

    const rolActualizado = await Rol.findByIdAndUpdate(
      id,
      { permisos },
      { new: true, runValidators: true }
    );

    if (!rolActualizado) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    res.json(rolActualizado);
  } catch (error) {
    console.error('Error al actualizar permisos:', error);
    res.status(500).json({ 
      message: 'Error al actualizar permisos',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

export const eliminarRol = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rolEliminado = await Rol.findByIdAndDelete(id);

    if (!rolEliminado) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    res.json({ 
      message: 'Rol eliminado correctamente',
      id: rolEliminado._id 
    });
  } catch (error) {
    console.error('Error al eliminar rol:', error);
    res.status(500).json({ 
      message: 'Error al eliminar el rol',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};