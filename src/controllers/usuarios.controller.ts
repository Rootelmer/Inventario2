// src/controllers/usuarios.controller.ts
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

// Obtener todos los usuarios
export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Crear nuevo usuario
export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, email, rol, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: 'El correo ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new User({ nombre, email, rol, password: hashedPassword });
    await nuevoUsuario.save();

    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, email, rol, password } = req.body;

    const usuario = await User.findById(id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email || usuario.email;
    usuario.rol = rol || usuario.rol;
    if (password) usuario.password = await bcrypt.hash(password, 10);

    await usuario.save();
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await User.findByIdAndDelete(id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};
