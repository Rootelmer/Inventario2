import { Request, Response } from 'express';
import Salida from '../models/Salida';
import { Producto } from '../models/Producto';
import Entrada from '../models/Entrada';

// ---------------------- AUTOCOMPLETADO ----------------------
export const obtenerSugerenciasProductos = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const productos = await Producto.find({
      nombre: { $regex: query, $options: 'i' }
    }).select('nombre _id').limit(10);

    res.json(productos);
  } catch (error) {
    console.error('Error al obtener sugerencias:', error);
    res.status(500).json({ message: 'Error al obtener sugerencias', error });
  }
};

// ---------------------- PRECIO DE VENTA ----------------------
export const obtenerPrecioVenta = async (req: Request, res: Response) => {
  try {
    const { productoId } = req.params;

    const ultimaEntrada = await Entrada.findOne({ producto: productoId })
      .sort({ createdAt: -1 })
      .populate<{ producto: { nombre: string } }>('producto', 'nombre');

    if (!ultimaEntrada) {
      return res.status(404).json({ message: 'No se encontró información de precio para este producto' });
    }

    res.json({
      precioVenta: ultimaEntrada.precioVenta,
      producto: ultimaEntrada.producto.nombre
    });
  } catch (error) {
    console.error('Error al obtener precio:', error);
    res.status(500).json({ message: 'Error al obtener precio', error });
  }
};

// ---------------------- SALIDAS CRUD ----------------------
export const crearSalida = async (req: Request, res: Response) => {
  try {
    const ultimaSalida = await Salida.findOne().sort({ createdAt: -1 });

    let nuevoNumero = 'F0001';
    if (ultimaSalida && ultimaSalida.numeroFactura) {
      const ultimoNumero = parseInt(ultimaSalida.numeroFactura.replace('F', ''));
      const siguienteNumero = ultimoNumero + 1;
      nuevoNumero = 'F' + String(siguienteNumero).padStart(4, '0');
    }

    const nuevaSalida = new Salida({
      ...req.body,
      numeroFactura: nuevoNumero,
    });

    await nuevaSalida.save();
    res.status(201).json(nuevaSalida);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la salida', error });
  }
};

export const obtenerSalidas = async (_req: Request, res: Response) => {
  try {
    const salidas = await Salida.find();
    res.json(salidas);
  } catch (error) {
    console.error('Error al obtener salidas:', error);
    res.status(500).json({ message: 'Error al obtener salidas', error });
  }
};

export const actualizarSalida = async (req: Request, res: Response) => {
  try {
    const salidaActualizada = await Salida.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!salidaActualizada) {
      return res.status(404).json({ message: 'Salida no encontrada' });
    }
    res.json(salidaActualizada);
  } catch (error) {
    console.error('Error al actualizar salida:', error);
    res.status(500).json({ message: 'Error al actualizar salida', error });
  }
};

export const eliminarSalida = async (req: Request, res: Response) => {
  try {
    const salidaEliminada = await Salida.findByIdAndDelete(req.params.id);
    if (!salidaEliminada) {
      return res.status(404).json({ message: 'Salida no encontrada' });
    }
    res.json({ message: 'Salida eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar salida:', error);
    res.status(500).json({ message: 'Error al eliminar salida', error });
  }
};

// ---------------------- GESTIÓN DE EXISTENCIAS ----------------------

// Verificar existencia total de un producto
export const verificarExistencia = async (req: Request, res: Response) => {
  try {
    const { productoId } = req.params;
    const { cantidad } = req.query;

    const existenciaTotal = await Entrada.aggregate([
      { $match: { producto: productoId } },
      { $group: { _id: null, total: { $sum: "$existenciaActual" } } }
    ]);

    const totalExistencia = existenciaTotal[0]?.total || 0;
    const suficiente = totalExistencia >= parseInt(cantidad as string);

    res.json({ suficiente, existenciaActual: totalExistencia });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Obtener entradas disponibles de un producto (FIFO)
export const obtenerEntradasProducto = async (req: Request, res: Response) => {
  try {
    const { productoId } = req.params;
    const entradas = await Entrada.find({
      producto: productoId,
      existenciaActual: { $gt: 0 }
    }).sort({ fechaEntrada: 1 }); // FIFO: primero las más antiguas

    res.json(entradas);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Actualizar existencia aplicando método FIFO
export const actualizarExistencia = async (req: Request, res: Response) => {
  try {
    const { productoId } = req.params;
    const { cantidad } = req.body;

    let cantidadRestante = cantidad;
    const entradas = await Entrada.find({
      producto: productoId,
      existenciaActual: { $gt: 0 }
    }).sort({ fechaEntrada: 1 });

    for (const entrada of entradas) {
      if (cantidadRestante <= 0) break;

      const cantidadADescontar = Math.min(cantidadRestante, entrada.existenciaActual);
      entrada.existenciaActual -= cantidadADescontar;
      cantidadRestante -= cantidadADescontar;

      await entrada.save();
    }

    if (cantidadRestante > 0) {
      return res.status(400).json({
        error: 'No hay suficiente existencia después del procesamiento'
      });
    }

    res.json({ message: 'Existencia actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
