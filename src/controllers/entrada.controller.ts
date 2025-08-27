import { Request, Response } from 'express';
import Entrada from '../models/Entrada';

// Crear una nueva entrada
export const crearEntrada = async (req: Request, res: Response) => {
  try {
    const nuevaEntrada = new Entrada(req.body);
    const entradaGuardada = await nuevaEntrada.save();
    res.status(201).json(entradaGuardada);
  } catch (error) {
    console.error('Error al crear entrada:', error);
    res.status(500).json({ message: 'Error al crear entrada', error });
  }
};

// Obtener todas las entradas con productos, categoría y proveedor
export const obtenerEntradas = async (req: Request, res: Response) => {
  try {
    const entradas = await Entrada.find()
      .populate({
        path: 'producto',
        populate: {
          path: 'categoria',
          model: 'Categoria'
        }
      })
      .populate('proveedor');

    res.json(entradas);
  } catch (error) {
    console.error('Error al obtener entradas:', error);
    res.status(500).json({ message: 'Error al obtener entradas', error });
  }
};

// Actualizar una entrada por ID
export const actualizarEntrada = async (req: Request, res: Response) => {
  try {
    const entradaActualizada = await Entrada.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!entradaActualizada) {
      return res.status(404).json({ message: 'Entrada no encontrada' });
    }

    res.json(entradaActualizada);
  } catch (error) {
    console.error('Error al actualizar entrada:', error);
    res.status(500).json({ message: 'Error al actualizar entrada', error });
  }
};

// Eliminar una entrada por ID
export const eliminarEntrada = async (req: Request, res: Response) => {
  try {
    const entradaEliminada = await Entrada.findByIdAndDelete(req.params.id);

    if (!entradaEliminada) {
      return res.status(404).json({ message: 'Entrada no encontrada' });
    }

    res.json({ message: 'Entrada eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar entrada:', error);
    res.status(500).json({ message: 'Error al eliminar entrada', error });
  }
};


