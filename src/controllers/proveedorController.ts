import { Request, Response } from 'express';
import { Proveedor } from '../models/Proveedor';

export const getProveedores = async (req: Request, res: Response) => {
  const { filtro } = req.query;
  const regex = new RegExp(filtro as string, 'i');
  const proveedores = await Proveedor.find({
    $or: [
      { nombre: regex },
      { correo: regex },
      { telefono: regex },
    ],
  });
  res.json(proveedores);
};

export const createProveedor = async (req: Request, res: Response) => {
  const { nombre, correo, telefono, direccion } = req.body;
  const nuevoProveedor = new Proveedor({ nombre, correo, telefono, direccion });
  await nuevoProveedor.save();
  res.json(nuevoProveedor);
};

export const updateProveedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, correo, telefono, direccion } = req.body;
  const proveedor = await Proveedor.findByIdAndUpdate(id, { nombre, correo, telefono, direccion }, { new: true });
  res.json(proveedor);
};

export const deleteProveedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Proveedor.findByIdAndDelete(id);
  res.json({ message: 'Proveedor eliminado' });
};
