// src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Rutas
import authRoutes from './routes/authRoutes';
import categoriaRoutes from './routes/categoria.routes';
import productoRoutes from './routes/producto.routes';
import proveedorRoutes from './routes/proveedorRoutes';
import entradaRoutes from './routes/entrada.routes';
import salidaRoutes from './routes/salida.routes';
import serviciosRoutes from './routes/servicios.routes';
import rolRoutes from './routes/rol.routes';
import usuariosRoutes from './routes/usuarios.routes';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api', productoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/entradas', entradaRoutes);
app.use('/api/salidas', salidaRoutes);
app.use('/api/servicios', serviciosRoutes);

app.use('/api/roles', rolRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Conexión a MongoDB y arranque del servidor
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('Conectado a la base de datos');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error conectando a MongoDB:', err);
  });
