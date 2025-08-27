// src/routes/categoria.routes.ts
import express from 'express';
import Categoria from '../models/Categoria';

const router = express.Router();

// Crear nueva categoría
router.post('/', async (req, res) => {
  try {
    const nuevaCategoria = new Categoria({ nombre: req.body.nombre });
    await nuevaCategoria.save();
    res.status(201).json(nuevaCategoria);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear categoría' });
  }
});

// Obtener todas las categorías
router.get('/', async (_req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// Eliminar una categoría
router.delete('/:id', async (req, res) => {
  try {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({ message: 'Categoría eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
});

// Editar una categoría
router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Categoria.findByIdAndUpdate(
      req.params.id,
      { nombre: req.body.nombre },
      { new: true }
    );
    res.json(actualizada);
  } catch (err) {
    res.status(500).json({ error: 'Error al editar categoría' });
  }
});

export default router;
