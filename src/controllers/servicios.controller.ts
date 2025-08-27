import { Request, Response } from 'express';
import Servicio from '../models/Servicio';

// GET /api/servicios
export const listarServicios = async (_req: Request, res: Response) => {
  try {
    const servicios = await Servicio.find().sort({ createdAt: -1 });
    res.json(servicios);
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener servicios' });
  }
};

// POST /api/servicios
export const crearServicio = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const servicio = new Servicio({
      nombreCliente: data.nombreCliente,
      numeroCelular: data.numeroCelular,
      fecha: data.fecha,
      nombreEquipo: data.nombreEquipo,
      contrasenaEquipo: data.contrasenaEquipo || '',
      accesorios: data.accesorios || '',
      descripcionProblema: data.descripcionProblema || '',
      precioServicio: data.precioServicio
    });
    const creado = await servicio.save();
    res.status(201).json(creado);
  } catch (e) {
    res.status(500).json({ message: 'Error al crear servicio' });
  }
};

// PUT /api/servicios/:id
export const actualizarServicio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const actualizado = await Servicio.findByIdAndUpdate(id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json(actualizado);
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar servicio' });
  }
};

// DELETE /api/servicios/:id
export const eliminarServicio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const eliminado = await Servicio.findByIdAndDelete(id);
    if (!eliminado) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json({ message: 'Servicio eliminado' });
  } catch (e) {
    res.status(500).json({ message: 'Error al eliminar servicio' });
  }
};
