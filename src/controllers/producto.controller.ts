import { Request, Response } from 'express';
import { Producto } from '../models/Producto';

export const crearProducto = async (req: Request, res: Response) => {
  try {
    const { nombre, detalles, categoria } = req.body;

    const nuevoProducto = new Producto({ nombre, detalles, categoria });
    await nuevoProducto.save();

    res.status(201).json({ message: 'Producto registrado correctamente' });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Ya existe un producto con este nombre' });
    }
    res.status(500).json({ message: 'Error al registrar producto', error });
  }
};


export const obtenerProductos = async (_req: Request, res: Response) => {
  try {
    const productos = await Producto.find().populate('categoria', 'nombre');
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Producto.findByIdAndDelete(id);
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error });
  }
};

export const editarProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, detalles, categoria } = req.body;

    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      { nombre, detalles, categoria },
      { new: true }
    );

    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al editar producto', error });
  }
};
///obtenerProductosPorCategoria
export const obtenerProductosPorCategoria = async (req: Request, res: Response) => {
  const { categoriaId } = req.params;

  try {
    const productos = await Producto.find({ categoria: categoriaId });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos por categoría', error });
  }
};

